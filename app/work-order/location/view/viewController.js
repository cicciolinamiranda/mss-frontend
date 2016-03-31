module.exports = createCtrl;

/*@ngInject*/
function createCtrl(ViewLocationSvc, $stateParams) {
  var _this = this;
  _this.locId = $stateParams.id;
  _this.mapSource;
  _this.coordinates;
  _this.duration;
  _this.cloc;
  _this.protectiveEquipList = [];
  _this.modeOfTransportList = [];
  _this.barredEmployeesList = [];

  function init() {

    ViewLocationSvc.getLocationDetails(_this.locId).then(function(response){
      _this.cloc = response[0];

      _this.mapSource = "https://maps.googleapis.com/maps/api/staticmap?zoom=17&size=2000x200&markers="
        + _this.cloc.latitude + "," + _this.cloc.longitude;

      if(_this.cloc.latitude && _this.cloc.longitude){
        _this.coordinates = _this.cloc.latitude + " " + _this.cloc.longitude;
      }

      if(_this.cloc.startDate && _this.cloc.endDate){
        _this.duration = _this.cloc.startDate + " - " + _this.cloc.endDate;
      }

      if(_this.cloc.protectiveEquipment){
        for(i = 0; i < _this.cloc.protectiveEquipment.length; i++){
          var equip = {};
          equip.name = _this.cloc.protectiveEquipment[i].equipmentName;
          if(_this.cloc.protectiveEquipment[i].billed){
            //TODO: query costType value
            equip.costType = "[" + _this.cloc.protectiveEquipment[i].costType + "]";
          }
          _this.protectiveEquipList.push(equip);
        }
      }

      if(_this.cloc.modeOfTransport){
        for(i = 0; i < _this.cloc.modeOfTransport.length; i++){
          var mot = {};
          mot.name = _this.cloc.modeOfTransport[i].transportName;
          if(_this.cloc.modeOfTransport[i].billed){
            //TODO: query costType value
            mot.costType = "[" + _this.cloc.modeOfTransport[i].costType + "]";
          }
          _this.modeOfTransportList.push(mot);
        }
      }

      if(_this.cloc.barredEmployees){
        for(i = 0; i < _this.cloc.barredEmployees.length; i++){
          var emp = {};
          emp.name = _this.cloc.barredEmployees[i].surname +
            ", " + _this.cloc.barredEmployees[i].firstname +
            " " + _this.cloc.barredEmployees[i].middlename;
          emp.barsStartDate = _this.cloc.barredEmployees[i].barsStartDate;

          _this.barredEmployeesList.push(emp);
        }
      }

    }, function (error) {
      _this.errMessage= error;
    });


  }

  init();

}

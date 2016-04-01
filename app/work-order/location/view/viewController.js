module.exports = createCtrl;

/*@ngInject*/
function createCtrl(ViewLocationSvc, $state, $stateParams) {
  var _this = this;
  _this.locId = $stateParams.id;
  _this.mapSource;
  _this.coordinates;
  _this.duration;
  _this.cloc;
  _this.protectiveEquipList = [];
  _this.modeOfTransportList = [];
  _this.barredEmployeesList = [];

  _this.archiveLocation = archiveLocation;

  function init() {

    ViewLocationSvc.getLocationDetails(_this.locId).then(function(response){
      _this.cloc = response[0];
      formatDisplay(_this.cloc);

    }, function (error) {
      _this.errMessage= error;
    });
  }

  init();

  //for mode of transport and protective equipment
  function getCostType(sourceData, destObject){
    if(sourceData.billed){
      ViewLocationSvc.getBilledCostType(sourceData.costType)
        .then(function(response){
          destObject.costType = "[" + response[0].name + "]";
      });
    }
  }

  function formatBarredEmployeesDisplay(barredEmployees) {
    if(barredEmployees){
      for(i = 0; i < barredEmployees.length; i++){
        var emp = {};
        emp.name = barredEmployees[i].surname +
          ", " + barredEmployees[i].firstname +
          " " + barredEmployees[i].middlename;
        emp.barsStartDate = barredEmployees[i].barsStartDate;

        _this.barredEmployeesList.push(emp);
      }
    }
  }


  function formatDisplay(location){

    _this.mapSource = "https://maps.googleapis.com/maps/api/staticmap?zoom=17&size=2000x200&markers="
      + location.latitude + "," + location.longitude;

    if(location.latitude && location.longitude){
      _this.coordinates = location.latitude + " " + location.longitude;
    }

    if(location.startDate && location.endDate){
      _this.duration = location.startDate + " - " + location.endDate;
    }

    if(location.protectiveEquipment){
      for(i = 0; i < location.protectiveEquipment.length; i++){
        var equip = {};
        equip.name = location.protectiveEquipment[i].equipmentName;
        getCostType(location.protectiveEquipment[i], equip);
        _this.protectiveEquipList.push(equip);
      }
    }

    if(location.modeOfTransport){
      for(i = 0; i < location.modeOfTransport.length; i++){
        var mot = {};
        mot.name = location.modeOfTransport[i].transportName;
        getCostType(location.modeOfTransport[i], mot);
        _this.modeOfTransportList.push(mot);
      }
    }

    formatBarredEmployeesDisplay(location.barredEmployees);
  }

  function archiveLocation(id){
    $state.go('workOrder', {id: 1});
  }
}

module.exports = createCtrl;
var moment = require('moment');
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
  _this.editLocation = editLocation;

  function init() {

    ViewLocationSvc.getLocationDetails(_this.locId).then(function(response){
      _this.cloc = response;
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
        emp.name = barredEmployees[i].lastName +
          ", " + barredEmployees[i].firstName;
        emp.barsStartDate = moment(transformJodaTimeToDate(barredEmployees[i].startDate)).format("MM/DD/YYYY");
        emp.barsEndDate = moment(transformJodaTimeToDate(barredEmployees[i].endDate)).format("MM/DD/YYYY");
        emp.barred = true;
        if('undefined' === barredEmployees[i].endDate) {
        emp.barred = false;
        }
        _this.barredEmployeesList.push(emp);
      }
    }
  }


  function formatDisplay(location){
    _this.mapSource = "https://maps.googleapis.com/maps/api/staticmap?zoom=17&scale=1&size=640x280&markers="
      + location.address.latitude + "," + location.address.longitude;

    if(location.address.latitude && location.address.longitude){
      _this.coordinates = location.address.latitude + " " + location.address.longitude;
    }

    if(location.startDate && location.endDate){
      _this.duration = moment(transformJodaTimeToDate(location.startDate)).format("MM/DD/YYYY") + " - " + moment(transformJodaTimeToDate(location.endDate)).format("MM/DD/YYYY");
    }

    if(location.equipments){
      for(i = 0; i < location.equipments.length; i++){
        var equip = {};
        equip.name = location.equipments[i].equipmentName;
        getCostType(location.equipments[i], equip);
        _this.protectiveEquipList.push(equip);
      }
    }

    if(location.modeOfTransports){
      for(i = 0; i < location.modeOfTransports.length; i++){
        var mot = {};
        mot.name = location.modeOfTransports[i].transportName;
        getCostType(location.modeOfTransports[i], mot);
        _this.modeOfTransportList.push(mot);
      }
    }
    formatBarredEmployeesDisplay(location.barredEmployees);
  }

  function archiveLocation(id){
    $state.go('workOrder', {id: 1});
  }

  function editLocation(id){
    $state.go('location.edit', {id: $stateParams.id});
  }

  function transformJodaTimeToDate(jodatime) {
    var date;
      if(undefined !== jodatime) {
        date = moment((jodatime.monthOfYear+"/"+jodatime.dayOfMonth+"/"+jodatime.year),"MM/DD/YYYY").toDate();
      }
    return date;
  }
}

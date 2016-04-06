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

  //Posts
  _this.goToViewPost = goToViewPost;
  _this.postLists;

  function init() {

    ViewLocationSvc.getLocationDetails(_this.locId).then(function(response){
      _this.cloc = response;
      formatDisplay(_this.cloc);

    }, function (error) {
      _this.errMessage= error;
    });

    getPostDetailsList(_this.locId);
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

  function getPostDetailsList(id) {
    ViewLocationSvc.getPostDetailsList(id)
      .then(function(response){
        _this.postLists = response;
    });
  }

  function formatBarredEmployeesDisplay(barredEmployees) {
    console.log(barredEmployees);
    if(barredEmployees){
      for(i = 0; i < barredEmployees.length; i++){
        var emp = {};
        emp.name = barredEmployees[i].lastName +
          ", " + barredEmployees[i].firstName;
        emp.barsStartDate = moment(transformJodaTimeToDate(barredEmployees[i].startDate)).format("MM/DD/YYYY");

        if(barredEmployees[i].endDate){
          emp.isLifted = false;
          emp.barsEndDate = moment(transformJodaTimeToDate(barredEmployees[i].endDate)).format("MM/DD/YYYY");
        }else{
          emp.isLifted = true;
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

    if(location.startDate){
      _this.duration = moment(transformJodaTimeToDate(location.startDate)).format("MM/DD/YYYY");
    }

    if(location.endDate != null){
      _this.duration += " - "+moment(transformJodaTimeToDate(location.endDate)).format("MM/DD/YYYY");
    }

    if(location.equipments){
      for(i = 0; i < location.equipments.length; i++){
        var equip = {};
        equip.name = location.equipments[i].name;
        getCostType(location.equipments[i], equip);
        _this.protectiveEquipList.push(equip);
      }
    }

    if(location.modeOfTransports){
      for(i = 0; i < location.modeOfTransports.length; i++){
        var mot = {};
        mot.name = location.modeOfTransports[i].name;
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

  function goToViewPost(id) {
  //Will be replaced by a post id once integration is done
  $state.go('post', {id: id});
  }

}

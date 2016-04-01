module.exports = viewCtrl;

/*@ngInject*/
function viewCtrl($state, $stateParams) {
  var _this = this;
  _this.workOrderId = $stateParams.id;
  _this.goToCreateLocation = goToCreateLocation;

  function init() {

  }

  init();


  function goToCreateLocation(){
    $state.go('location.create',{workOrderId: 1});
  }
}

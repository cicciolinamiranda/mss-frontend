module.exports = viewCtrl;

/*@ngInject*/
function viewCtrl($state, $stateParams) {
  var _this = this;
  _this.workOrderId = $stateParams.id;
  _this.switchView = switchView;
  _this.viewDeeperAdd = false;
  _this.goToCreateLocation = goToCreateLocation;

  function init() {

  }

  init();

  function switchView(){
    _this.viewDeeperAdd = true;
  }

  function goToCreateLocation(){
    $state.go('location.create',{workOrderId: 1});
  }
}

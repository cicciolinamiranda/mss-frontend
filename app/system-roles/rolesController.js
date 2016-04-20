module.exports = rolesCtrl;

/*@ngInject*/ function rolesCtrl(RolesSvc) {
  var _this = this;

  function init() {
   RolesSvc.getList().then(function(roles){
    _this.roles = roles;
   });
  }

  init();
}

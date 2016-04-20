module.exports = rolesCtrl;

/*@ngInject*/ function rolesCtrl(RolesSvc) {
  var _this = this;

  function init() {
   RolesSvc.get().then(function(roles){
    _this.roles = roles;
   });
  }

  init();
}

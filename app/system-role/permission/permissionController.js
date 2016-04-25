module.exports = permissionsCtrl;

/*@ngInject*/function permissionsCtrl(PermissionsSvc,$stateParams) {
  var _this = this;
  _this.roleId = $stateParams.roleId
  function init() {
  	PermissionsSvc.getPermissionsById(_this.roleId).then(function(permissions){
  		_this.permissions = permissions;
  	});
  }
  init();
}

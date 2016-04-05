module.exports = licencesCtrl;

/*@ngInject*/ function licencesCtrl(LicencesSvc) {
  var _this = this;

  function init() {
    LicencesSvc.getLicences(_this.employee).then(function(licences){
    _this.licences = licences;
    });
  }

  init();
}

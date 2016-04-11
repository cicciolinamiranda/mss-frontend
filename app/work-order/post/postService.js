module.exports = function (ngModule) {
  ngModule.service('PostService', postService);
};

function postService($q, $gapi, WORKORDER_GAPI_BASE) {
  var _this = this;
  _this.getAllLicenses = getAllLicenses;
  _this.getAllPostSkills = getAllPostSkills;
  _this.getAllUniforms = getAllUniforms;
  _this.getAllEquipment = getAllEquipment;

  var deferred = $q.defer();
  var loadApi = deferred.promise;

}

module.exports = function (ngModule) {
  ngModule.service('CreatePostSvc', createPostService);
};

function createPostService($q, $gapi, WORKORDER_GAPI_BASE) {

  var _this = this;
  _this.getAllLicenses = getAllLicenses;
  _this.getAllSkills = getAllSkills;
  _this.getAllUniforms = getAllUniforms;
  _this.getAllEquipments = getAllEquipments;

  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function () {
    return $gapi.load('workorder', 'v1', WORKORDER_GAPI_BASE);
  }).then(function () {
    return deferred.resolve();
  });

  function getAllLicenses() {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.workorder.master.file.license.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  }

  function getAllSkills() {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.workorder.master.file.skills.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  }

  function getAllUniforms() {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.workorder.master.file.uniform.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  }

  function getAllEquipments() {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.workorder.master.file.postequipment.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  }
}

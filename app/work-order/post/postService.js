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

  $gapi.loaded.then(function () {
    return $gapi.load('customerContract', 'v1', WORKORDER_GAPI_BASE);
  }).then(function () {
    return deferred.resolve();
  });

  function getAllLicenses() {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.license.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  }

  function getAllPostSkills() {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.postskills.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  }

  function getAllUniforms() {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.uniform.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  }

  function getAllEquipment() {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.equipment.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  }
}

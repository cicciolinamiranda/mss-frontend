module.exports = function(ngModule) {
  ngModule.service('PostService', postService);
};

function postService($q, $gapi, WORKORDER_GAPI_BASE) {
  var _this = this;

  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function () {
    return $gapi.load('customerContract', 'v1', WORKORDER_GAPI_BASE);
  }).then(function () {
    return deferred.resolve();
  });

  _this.getGenderValues = function(){
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.gender.list();
    }).then(function (data) {
      console.log(data.items);
      def.resolve(data.items);
    });
    return def.promise;
  }

  _this.searchTrainings = function(keyword) {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.training.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  }

  _this.searchLanguages = function(keyword) {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.language.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  }

  _this.searchPhysicalConditions = function(keyword) {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.physicalcondition.list();
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

  function getAllEquipments() {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.equipment.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  }

  return _this;
}

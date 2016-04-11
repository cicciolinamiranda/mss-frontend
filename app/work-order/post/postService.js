module.exports = function (ngModule) {
  ngModule.service('PostService', postService);
};

function postService($q, $gapi, WORKORDER_GAPI_BASE) {
  var _this = this;
  _this.getAllLicenses = getAllLicenses;
  _this.getAllPostSkills = getAllPostSkills;
  _this.getAllUniforms = getAllUniforms;
  _this.getAllEquipments = getAllEquipments;
  _this.addToArray = addToArray;
  _this.removeFromArray = removeFromArray;

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

  function getAllEquipments() {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.equipment.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  }

  function addToArray(array, item) {
    var newItem = angular.copy(item);

    for (var i = 0; i < array.length; i++) {
      if (array[i].id === newItem.id) {
        return;
      }
    }

    array.push(newItem);
  }

  function removeFromArray(array, id) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        array.splice(i, 1);
      }
    }
  }
}

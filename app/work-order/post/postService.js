module.exports = function (ngModule) {
  ngModule.service('PostService', postService);
};

function postService($q, $gapi, $http, WORKORDER_GAPI_BASE) {
  var _this = this;

  var deferred = $q.defer();
  var loadApi = deferred.promise;

  _this.uploadImage = uploadImage;

  function uploadImage(imageFile){
    var formData = new FormData();
    formData.append('file', imageFile);

    return $http({
        method: 'POST',
        url: 'http://localhost:8080/upload/post/image',
        headers: {'Content-Type': undefined},
        data : formData,
        transformRequest: angular.identity
    });
  }


  $gapi.loaded.then(function () {
    return $gapi.load('customerContract', 'v1', WORKORDER_GAPI_BASE);
  }).then(function () {
    return deferred.resolve();
  });

  _this.getGenderValues = function () {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.gender.list();
    }).then(function (data) {
      def.resolve(data.items);
    });
    return def.promise;
  };

  _this.searchTrainings = function (keyword) {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.training.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  };

  _this.searchLanguages = function (keyword) {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.language.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  };

  _this.searchPhysicalConditions = function (keyword) {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.physicalcondition.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  };

  _this.getAllLicenses = function () {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.license.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  };

  _this.getAllPostSkills = function () {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.postskills.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  };

  _this.getAllUniforms = function () {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.uniform.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  };

  _this.getAllEquipments = function () {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.postequipment.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  };

  _this.getAllHealthSafetyRequirements = function () {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.healthsafetyrequirement.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  };

  _this.getAllReligions = function () {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.religion.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  };

  _this.getAllQualifications = function () {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.qualification.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  };

  _this.getAllRoles = function () {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.role.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  };

  _this.getPostAllowances = function () {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.postallowances.list();
    }).then(function (data) {
      def.resolve(data.items);
    });

    return def.promise;
  };

  _this.getCallInFrequencies = function () {
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.master.file.callfrequency.list();
    }).then(function (data) {
      def.resolve(data.items);
    });
    return def.promise;
  };


  return _this;
}

module.exports = function(ngModule) {
  ngModule.service('ViewLocationSvc', viewLocationService);
};

function viewLocationService($http, $q, $gapi, GAPI_BASE, MOCK_BASE) {

  var _this = this;

  _this.getLocationDetails = getLocationDetails;
  _this.getBilledCostType = getBilledCostType;
  _this.locDetails;

  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function () {
    return $gapi.load('workorder', 'v1', GAPI_BASE);
  }).then(function () {
    return deferred.resolve();
  });


  function getLocationDetails(id){
    var def = $q.defer();

    // $http.get(MOCK_BASE + "/customerLocation", {params:{"id": id}})
    //      .success(function(response) {
    //           _this.locDetails = response;
    //           def.resolve(response);
    //         })
    //       .error(function() {
    //           def.reject("Server is down.");
    //       });

    loadApi.then(function () {
      return $gapi.client.workorder.customer.location.get({'id' : id});
      def.resolve(response);
    }).then(function (data) {
      def.resolve(data);
    });
    return def.promise;
  }

  function getBilledCostType(id){
    var def = $q.defer();

    $http.get(MOCK_BASE + "/billedCostType", {params:{"id": id}})
         .success(function(response) {
              _this.billedCostType = response;
              def.resolve(response);
            })
          .error(function() {
              def.reject("Server is down.");
          });
    return def.promise;
  }

}

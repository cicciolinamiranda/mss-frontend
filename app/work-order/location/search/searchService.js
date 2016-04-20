module.exports = function(ngModule) {
  ngModule.service('locationSearchSvc', locationSearchService);
};

function locationSearchService($q, $gapi, WORKORDER_GAPI_BASE) {
  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function () {
    return $gapi.load('customerContract', 'v1', WORKORDER_GAPI_BASE);
  }).then(function () {
    return deferred.resolve();
  });

  this.search = function(query) {
    var deferred2 = $q.defer();
    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.customer.location.search({
        'searchterm': query
      });
    }).then(function (data) {
      deferred2.resolve(data);
    });
    return deferred2.promise;
  };
}

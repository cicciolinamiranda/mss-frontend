module.exports = function(ngModule) {
  ngModule.service('ViewPostSvc', viewPostService);
};

function viewPostService($q, $gapi, WORKORDER_GAPI_BASE) {
  var _this = this;
  _this.getPostDetailsById = getPostDetailsById;
  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function () {
    return $gapi.load('customerContract', 'v1', WORKORDER_GAPI_BASE);
  }).then(function () {
    return deferred.resolve();
  });

  function getPostDetailsById(id){
    var def = $q.defer();
    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.customer.location.post.get({'id' : id});
    }).then(function (data) {
      def.resolve(data);
    });
    return def.promise;
  }

}

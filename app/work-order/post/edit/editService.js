module.exports = function (ngModule) {
  ngModule.service('EditPostSvc', editPostService);
};

function editPostService($q, $gapi, WORKORDER_GAPI_BASE) {

  var _this = this;
  var deferred = $q.defer();
  var loadApi = deferred.promise;

  _this.getPostDetailsById = getPostDetailsById;
  _this.update = update;

  $gapi.loaded.then(function() {
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

  function update(postDto) {
    var deferred2 = $q.defer();
    loadApi.then(function() {
      return $gapi.client.customerContract.workorder.customer.location.post.update(
        postDto
      );
    }).then(function(data) {
      deferred2.resolve(data);
    });
    return deferred2.promise;
  };

  _this.save = function(postDto) {
    var deferred2 = $q.defer();
    loadApi.then(function() {
      return $gapi.client.customerContract.workorder.customer.location.post.save(
        postDto
      );
    }).then(function(data) {
      deferred2.resolve(data);
    });
    return deferred2.promise;
  };

}

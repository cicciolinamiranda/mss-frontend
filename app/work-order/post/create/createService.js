module.exports = function (ngModule) {
  ngModule.service('CreatePostSvc', createPostService);
};

function createPostService($q, $gapi, WORKORDER_GAPI_BASE) {

  var _this = this;
  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function() {
    return $gapi.load('customerContract', 'v1', WORKORDER_GAPI_BASE);
  }).then(function () {
    return deferred.resolve();
  });

  this.save = function(postDto) {
    console.log('Post DTO',postDto);

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

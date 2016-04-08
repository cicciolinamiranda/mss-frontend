module.exports = function(ngModule) {
  ngModule.service('PostService', postService);
};

function postService($q, $gapi, WORKORDER_GAPI_BASE) {
  var _this = this;

  var deferred = $q.defer();
  var loadApi = deferred.promise;

}

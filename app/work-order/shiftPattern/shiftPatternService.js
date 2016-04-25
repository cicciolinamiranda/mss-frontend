module.exports = function (ngModule) {
  ngModule.service('ShiftPatternService', shiftPatternService);
};

function shiftPatternService($q, $gapi, WORKORDER_GAPI_BASE) {
  var _this = this;

  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function () {
    return $gapi.load('customerContract', 'v1', WORKORDER_GAPI_BASE);
  }).then(function () {
    return deferred.resolve();
  });




  return _this;
}

module.exports = function(ngModule) {
  ngModule.service('ViewContactService', viewContactService);
};

// var moment = require('moment');

function viewContactService($http, $q, $gapi, GAPI_BASE) {

  var _this = this;
  var cache = {};
  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function () {
    return $gapi.load('customerContract', 'v1', GAPI_BASE);
  }).then(function () {
    return deferred.resolve();
  });

  this.get = function(id) {
    var deferred2 = $q.defer();
    if (cache.hasOwnProperty(id)) {
      deferred2.resolve(cache[id]);
    }
    else {
      cache[id] = {};
      loadApi.then(function() {
        return $gapi.client.customerContract.contact.get({id: id});
      }).then(function(data) {
        console.log(data);
        angular.extend(cache[id], data);
        deferred2.resolve(cache[id]);
      });
    }
    return deferred2.promise;
  };

}

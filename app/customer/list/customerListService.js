module.exports = function(ngModule) {
  ngModule.service('CustomerListService', customerListService);
};

// var moment = require('moment');

function customerListService($http, $q, $gapi, GAPI_BASE) {

  var _this = this;
  var cache = [];
  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function () {
    return $gapi.load('customerContract', 'v1', GAPI_BASE);
  }).then(function () {
    return deferred.resolve();
  });

  this.list = function(pageNum) {
    pageNum = typeof pageNum !== 'undefined' ?  pageNum - 1 : 0;
    var deferred2 = $q.defer();
    if (cache[pageNum]) {
      deferred2.resolve(cache[pageNum]);
    }
    else {
      loadApi.then(function() {
        return $gapi.client.customerContract.customer.list();
      }).then(function(data) {
        cache[pageNum] = data.items;
        deferred2.resolve(cache[pageNum]);
      });
    }
    return deferred2.promise;
  };

}

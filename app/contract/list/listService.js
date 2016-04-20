module.exports = function(ngModule) {
  ngModule.service('ListContractService', listContractService);
};

// var moment = require('moment');

function listContractService($http, $q, $gapi, GAPI_BASE) {
  var cache = [];
  var _this = this;

  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function () {
    return $gapi.load('customerContract', 'v1', GAPI_BASE);
  }).then(function () {
    return deferred.resolve();
  });

  _this.list = function(pageNum){
    pageNum = typeof pageNum !== 'undefined' ? pageNum - 1 : 0;
    var deferred2 = $q.defer();
    if (cache[pageNum]){
      deferred2.resolve(cache[pageNum]);
    }
    else {
      loadApi.then(function(){
        return $gapi.client.customerContract.contract.list();
      }).then(function(data){
        cache[pageNum] = data.items;
        deferred2.resolve(cache[pageNum]);
      });
    }
    return deferred2.promise;
  };

}

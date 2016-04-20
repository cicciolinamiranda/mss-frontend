module.exports = function(ngModule) {
  ngModule.service('ViewContractService', viewContractService);
};

// var moment = require('moment');

function viewContractService($http, $q, $gapi, GAPI_BASE) {
  var cache = {};
  var _this = this;

  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function () {
    return $gapi.load('customerContract', 'v1', GAPI_BASE);
  }).then(function () {
    return deferred.resolve();
  });

  _this.get = function(contractNumber){
    var deferred2 = $q.defer();
    if(cache.hasOwnProperty(contractNumber)){
      deferred2.resolve(cache[contractNumber]);
    }
    else {
      cache[contractNumber] = {};
      loadApi.then(function(){
        return $gapi.client.customerContract.contract.get.byNumber({'contractNumber': contractNumber});
      }).then(function(data){
        angular.extend(cache[contractNumber], data.items[0]);
        deferred2.resolve(cache[contractNumber]);
      });
    }
    return deferred2.promise;
  };
}

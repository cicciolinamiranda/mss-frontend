module.exports = function(ngModule) {
  ngModule.service('CustomerViewService', customerViewService);
};

// var moment = require('moment');

function customerViewService($http, $q, $gapi, GAPI_BASE) {

  var _this = this;
  var cache = {};
  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function () {
    return $gapi.load('customerContract', 'v1', GAPI_BASE);
  }).then(function () {
    return deferred.resolve();
  });

  this.get = function(customerNumber) {
    var deferred2 = $q.defer();
    cache = {};
    if (cache.hasOwnProperty(customerNumber) && cache[customerNumber].hasOwnProperty('details')) {
      deferred2.resolve(cache[customerNumber].details);
    } else {
      cache[customerNumber] = {};
      cache[customerNumber].details = {};
      loadApi.then(function() {
        return $gapi.client.customerContract.customer.get.byCustomerNumber({customerNumber: customerNumber});
      }).then(function(data) {
        angular.extend(cache[customerNumber].details, data);
        deferred2.resolve(cache[customerNumber].details);
      });
    }
    return deferred2.promise;
  };


  this.getCustomerContracts = function(customerId) {
    var deferred2 = $q.defer();
    //pageNum = typeof pageNum !== undefined ?  pageNum - 1 : 0;
    cache = {};
    if (cache.hasOwnProperty(customerId) && cache[customerId].hasOwnProperty('contracts')) {
      deferred2.resolve(cache[customerId].contracts);
    } else {
      cache[customerId] = {};
      cache[customerId].contracts = {};
      loadApi.then(function() {
        return $gapi.client.customerContract.contract.get.byCustomerId({id: customerId});
      }).then(function(data) {
        angular.extend(cache[customerId].contracts, data.items);
        deferred2.resolve(cache[customerId].contracts);
      });
    }

    return deferred2.promise;
  };

}

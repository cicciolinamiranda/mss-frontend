module.exports = function(ngModule) {
  ngModule.service('CreateContactService', createContactService);
};

// var moment = require('moment');

function createContactService($http, $q, $gapi, GAPI_BASE) {

  var _this = this;

  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function () {
    return $gapi.load('customerContract', 'v1', GAPI_BASE);
  }).then(function () {
    return deferred.resolve();
  });

  _this.save = function (contactDetails) {
    console.log(contactDetails);
    var deferred2 = $q.defer();
    loadApi.then(function () {
      return $gapi.client.customerContract.contact.add(contactDetails);
    }).then(function (data) {
      deferred2.resolve(data);
    });
    return deferred2.promise;
  };

}

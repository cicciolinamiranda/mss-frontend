module.exports = function(ngModule) {
  ngModule.service('CreateContractService', createContractService);
};

var moment = require('moment');

function createContractService($http, $q, $gapi, GAPI_BASE) {

  var _this = this;

  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function () {
    return $gapi.load('customerContract', 'v1', GAPI_BASE);
  }).then(function () {
    return deferred.resolve();
  });

  function transformJsonToDTO(json) {
    _this.contractDetails = {
      'customer':json.customer,
      'number': json.number,
      'name': json.name,
      'title': json.title,
      'startDateStr': moment(json.startDate).format('MM/DD/YYYY'),
      'endDateStr': moment(json.endDate).format('MM/DD/YYYY'),
      'reviewDateStr': moment(json.reviewDate).format('MM/DD/YYYY'),
      'signedDateStr': moment(json.signedDate).format('MM/DD/YYYY'),
      'wefDateStr': moment(json.wefDate).format('MM/DD/YYYY'),
      // 'value': json.value,
      // 'limitsOfLiability': json.limitsOfLiability,
      // 'standardPaymentTerms': json.standardPaymentTerms,
      // 'manualContactNumber': json.manualContactNumber,
      // 'customerSigningAuthority': json.customerSigningAuthority,
      // 'designationAuthority':json.designationAuthority,
      // 'loiDate': json.loiDate,
      // 'loiStartDate': json.loiStartDate,
      // 'loiEndDate': json.loiEndDate,
      // 'issuingAuthority': json.issuingAuthority
    };
    return _this.contractDetails;
  }

  _this.save = function (contractDetails) {
    var deferred2 = $q.defer();
    loadApi.then(function () {
      return $gapi.client.customerContract.contract.save(transformJsonToDTO(contractDetails));
    }).then(function (data) {
      deferred2.resolve(data);
    });
    return deferred2.promise;
  };

  _this.getContactList = function () {
    var deferred2 = $q.defer();
    loadApi.then(function () {
      return $gapi.client.customerContract.contact.list();
    }).then(function (data) {
      deferred2.resolve(data.items);
    });
    return deferred2.promise;
  };

  function formatMomentDateThatMustBeNull(date) {
      var returnDate = null;
      if(undefined !== date) {
        returnDate = moment(date).format("MM/DD/YYYY");
      }
      return returnDate;
    }
}

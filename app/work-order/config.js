module.exports = function(ngModule) {
  //ngModule.constant('WORKORDER_GAPI_BASE','http://localhost:8080/_ah/api');
  //ngModule.constant('WORKORDER_UPLOAD_BASE','http://localhost:8080/');
  //ngModule.constant('WORKORDER_GAPI_BASE','https://customer-contracts-dot-javelin-uat.appspot.com/_ah/api');
  //ngModule.constant('WORKORDER_GAPI_BASE','https://customer-contracts-dot-javelin-qa.appspot.com/_ah/api');
  ngModule.constant('WORKORDER_UPLOAD_BASE','https://smp-dot-customer-contracts-dot-javelin-dev.appspot.com/');
  ngModule.constant('WORKORDER_GAPI_BASE','https://team3-dot-customer-contracts-dot-javelin-dev.appspot.com/_ah/api');
  ngModule.constant('MOCK_BASE','https://mss3-mockend-dot-cs-development-playground.appspot.com/');
  ngModule.constant('AUDITLOGS_GAPI_BASE','https://reports-dot-javelin-dev.appspot.com/');
};

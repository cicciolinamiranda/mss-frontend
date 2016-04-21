module.exports = function(ngModule) {
  ngModule.config(config);
  // ngModule.constant('GAPI_BASE','http://localhost:8080/_ah/api');
  ngModule.constant('GAPI_BASE','https://2-dot-ess-backend-dot-javelin-dev.appspot.com/_ah/api');
};

function config($gapiProvider) {
  // $gapiProvider.api_base = 'http://localhost:8080/_ah/api';
  $gapiProvider.api_base = 'https://2-dot-ess-backend-dot-javelin-dev.appspot.com/_ah/api';
}

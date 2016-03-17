module.exports = function(ngModule) {
  ngModule.config(config);
}

function config($gapiProvider) {
  "ngInject";
  $gapiProvider.api_base = 'https://cs-javelin-mss-dev.appspot.com/_ah/api';
}

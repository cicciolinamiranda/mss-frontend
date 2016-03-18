module.exports = function(ngModule) {
  ngModule.config(config);
};

function config($gapiProvider) {
  "ngInject";
  $gapiProvider.api_base = 'https://employee-be-dot-cs-javelin-mss-team-2.appspot.com/_ah/api';
}

module.exports = function (ngModule) {
  ngModule.config(config);
};

function config($gapiProvider) {
  //TODO: Replace with appspot url when backend is deployed
  $gapiProvider.api_base = '';
}

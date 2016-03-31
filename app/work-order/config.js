module.exports = function (ngModule) {
  ngModule.config(config);
};

function config($gapiProvider) {
  $gapiProvider.api_base = '';
}

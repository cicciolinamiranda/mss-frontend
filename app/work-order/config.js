// module.exports = function(ngModule) {
//   ngModule.constant('GAPI_BASE','https://2-dot-cs-development-playground.appspot.com/_ah/api');
// };
//
// function config($gapiProvider) {
//   //TODO: Replace with appspot url when backend is deployed
//   $gapiProvider.api_base = 'http://localhost:8083/_ah/api';
// }

//LOCAL
module.exports = function (ngModule) {
  ngModule.config(config);
};

// function config($gapiProvider) {
//   //TODO: Replace with appspot url when backend is deployed
//   $gapiProvider.api_base = 'http://localhost:8083/_ah/api';
// }

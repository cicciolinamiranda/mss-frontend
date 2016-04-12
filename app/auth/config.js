module.exports = function(ngModule) {
  ngModule.config(config);
};

function config($gapiProvider) {
  $gapiProvider.client_id = '346709668681-m26ttgdpvu4gabup4g5pecpv2ftfq3d2.apps.googleusercontent.com';
  $gapiProvider.scopes = ["email", "profile"];
}

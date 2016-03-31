module.exports = function(ngModule) {
  ngModule.config(config);
};

function config($gapiProvider) {
  $gapiProvider.client_id = '111384564915-9jlqps7hudnapqpnkohck9nq6ehhpp7n.apps.googleusercontent.com';
  $gapiProvider.scopes = ["email", "profile"];
}

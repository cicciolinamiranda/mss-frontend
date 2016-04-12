module.exports = function(ngModule) {
  ngModule.config(config);
};

function config($gapiProvider) {
  $gapiProvider.client_id = '346709668681-td68i35jnl7f40kdlmdgnj0gr2hcg2ua.apps.googleusercontent.com';
  $gapiProvider.scopes = ['email', 'profile'];
}

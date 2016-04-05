module.exports = function(ngModule) {
  ngModule.config(config);
};

function config($gapiProvider) {
  $gapiProvider.client_id = '224068816857-vit2ttgq6j8i0k73j9k3td8393lm4ln1.apps.googleusercontent.com';
  $gapiProvider.scopes = ["email", "profile"];
}

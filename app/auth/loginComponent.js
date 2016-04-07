module.exports = function(ngModule) {
  ngModule.component('loginForm', {
    template: require('./loginForm.html'),
    controller: require('./loginController')
  });
};

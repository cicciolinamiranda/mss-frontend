module.exports = function(ngModule) {
  ngModule.config(config);
};

function config(GAuthProvider) {
  GAuthProvider.destinationState = 'employee.list';
}

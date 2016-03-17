module.exports = function(ngModule) {
  ngModule.service('Employee', employeeModel);
};

function employeeModel() {
  "ngInject";
}

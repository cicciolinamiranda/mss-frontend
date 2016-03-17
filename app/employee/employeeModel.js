module.exports = function(ngModule) {
  ngModule.factory('Employee', employeeModel);
};

function employeeModel() {
  "ngInject";

  function Employee() {
  }

  return Employee;
}

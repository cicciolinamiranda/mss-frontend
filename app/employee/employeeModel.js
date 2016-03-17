module.exports = function(ngModule) {
  ngModule.factory('Employee', employeeModel);
};

function employeeModel() {
  "ngInject";

  function Employee(data) {
  	angular.extend(this, data);
  }

  return Employee;
}

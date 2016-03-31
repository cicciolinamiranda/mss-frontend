module.exports = function(ngModule) {
  ngModule.component('employeeLookup', {
    template: require('./employeeLookup.html'),
    controller: require('./employeeLookupController'),
    bindings: {
      onEmployeeSelect: '&',
      checkSelected: '&'
    }
  });
};

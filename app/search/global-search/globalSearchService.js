module.exports = function(ngModule) {
  ngModule.service('SearchService', searchService);
};

function searchService($state) {
  var _this = this;

  _this.filters = [
    'Everything',
    'Employee',
    'Location',
    'People'
  ];

  var _selectedFilter = _this.filters[0];

  _this.selectedFilter = function() {
    return _selectedFilter;
  };

  _this.selectFilter = function(filter) {
    _selectedFilter = filter;
  };

  _this.search = function(searchTerm) {
    if (_selectedFilter == 'Employee') {
      $state.go('employee.list', {q: searchTerm});
    }
  };
}

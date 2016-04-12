module.exports = globalSearchCtrl;

/*@ngInject*/
function globalSearchCtrl(SearchService) {
  var _this = this;

  _this.filters = SearchService.filters;
  _this.selectedFilter = SearchService.selectedFilter;
  _this.selectFilter = SearchService.selectFilter;

  _this.search = SearchService.search;
  _this.searchTerm = '';

  _this.onEnterSearch = function(event) {
    if (event.which === 13) SearchService.search(_this.searchTerm);
  };
}

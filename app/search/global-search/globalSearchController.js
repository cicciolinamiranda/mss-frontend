module.exports = globalSearchCtrl;

/*@ngInject*/
function globalSearchCtrl(SearchService) {
  var _this = this;

  _this.filters = SearchService.filters;
  _this.selectedFilter = SearchService.selectedFilter;
  _this.selectFilter = SearchService.selectFilter;

  _this.search = function() {
    console.log("searchTerm:"+_this.searchTerm);
    if(_this.searchTerm == '' || _this.searchTerm == undefined) {
      _this.emptyError = true;
    }
    else{
      _this.emptyError = false;
      SearchService.search(_this.searchTerm);
    }

  };
  _this.searchTerm = '';
}

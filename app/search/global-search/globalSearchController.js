module.exports = globalSearchCtrl;

/*@ngInject*/
function globalSearchCtrl(SearchService) {
  var _this = this;

  _this.filters = SearchService.filters;
  _this.selectedFilter = SearchService.selectedFilter;
  _this.selectFilter = SearchService.selectFilter;

  _this.search = function() {
    console.log("searchTerm:"+_this.searchTerm);
    if(_this.searchTerm == '') {
      _this.emptyError = true;
      _this.minLengthError = false;
    }
    else{
      _this.emptyError = false;
      if (_this.searchTerm.length < 2) _this.minLengthError = true;
      else{
        _this.minLengthError = false;
        SearchService.search(_this.searchTerm);
      }
    }

  };
  _this.searchTerm = '';
}

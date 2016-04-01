module.exports = globalSearchCtrl;

function globalSearchCtrl($state) {
  /*@ngInject*/
  var _this = this;

  _this.search = search;
  _this.searchTerm = '';

  function search(){
    $state.go('search',{q:_this.searchTerm});
  }
}

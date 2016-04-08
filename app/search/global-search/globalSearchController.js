module.exports = globalSearchCtrl;

/*@ngInject*/
function globalSearchCtrl($state) {
  var _this = this;

  _this.search = search;
  _this.searchTerm = '';
  _this.buttonLabel = 'Everything';
  _this.setSelected = setSelected;

  function search(){
    $state.go('search',{q:_this.searchTerm});
  }

  function setSelected(label){
    _this.buttonLabel = label;
  }
}

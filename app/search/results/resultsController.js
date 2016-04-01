module.exports = resultsCtrl;

/*@ngInject*/
function resultsCtrl($stateParams) {
  var _this = this;
  _this.query = $stateParams.q;
  _this.searchResults = [];

  function init(){

  }

}

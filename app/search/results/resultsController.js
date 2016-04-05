module.exports = resultsCtrl;

/*@ngInject*/
function resultsCtrl($stateParams, SearchResultsSvc) {
  var _this = this;
  _this.query = $stateParams.q;
  _this.searchResults = [];

  function init(){
    SearchResultsSvc.search(_this.query).then(function (response) {
      _this.searchResults = response.items;
    }, function (error) {
      _this.errMessage = error;
    });
  }

  init();
}

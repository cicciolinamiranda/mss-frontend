module.exports = resultsCtrl;

/*@ngInject*/
function resultsCtrl($stateParams, contractSearchSvc) {
  var _this = this;
  _this.query = $stateParams.searchTerm;
  _this.searchResults = [];

  function init(){
    contractSearchSvc.search(_this.query).then(function (response) {
      _this.contracts = response.items;
    }, function (error) {
      _this.errMessage = error;
    });
  }

  init();

}

module.exports = resultsCtrl;

/*@ngInject*/
function resultsCtrl($stateParams, customerSearchSvc) {
  var _this = this;
  _this.query = $stateParams.searchTerm;
  _this.searchResults = [];

  function init(){
    customerSearchSvc.search(_this.query).then(function (response) {
      _this.customers = response.items;
    }, function (error) {
      _this.errMessage = error;
    });
  }

  init();
}

module.exports = resultsCtrl;

/*@ngInject*/
function resultsCtrl($stateParams, locationSearchSvc) {
  var _this = this;
  _this.query = $stateParams.searchTerm;
  _this.searchResults = [];

  function init(){
    locationSearchSvc.search(_this.query).then(function (response) {
      _this.searchResults = response.items;
    }, function (error) {
      _this.errMessage = error;
    });
  }

  init();
}

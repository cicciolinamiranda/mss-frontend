module.exports = employeeLookupCtrl;

var moment = require('moment');

/*@ngInject*/
function employeeLookupCtrl(EmployeeLookupSvc) {
  var _this = this;
  _this.searchTerm = '';
  _this.searchResults = [];
  _this.message = '';

  _this.search = search;
  _this.add = add;
  _this.isSelected = isSelected;

  function search(){
    EmployeeLookupSvc.search(_this.searchTerm).then(function(results){
      if(results && results.length > 0){
        _this.searchResults = results;
        _this.message = "";
      }else{
        _this.searchResults = [];
        _this.message = "There are no matches found for your search term.";
      }
    }, function(error){
      _this.message = error;
    });
  }

  function add(employee){
    if(_this.onEmployeeSelect && (typeof _this.onEmployeeSelect) === 'function'){
      _this.onEmployeeSelect({employee:employee});
    }
  }

  function isSelected(id){
    if(_this.onEmployeeSelect && (typeof _this.onEmployeeSelect === 'function')){
      console.log("isSelected --->"+_this.checkSelected({id:id}));
      return _this.checkSelected({id:id});
    }
  }


}

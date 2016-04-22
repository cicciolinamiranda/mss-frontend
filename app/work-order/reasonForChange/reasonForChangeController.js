module.exports = reasonForChangeCtrl;

var moment = require('moment');

/*@ngInject*/
function reasonForChangeCtrl(LocationModel,PostModel,EditPostModel,CreatePostSvc,$state,$stateParams) {
  var _this = this;
  _this.locationModel = new LocationModel();
  _this.postModel = new PostModel();
  _this.editPostModel = new EditPostModel();

  _this.submit = function () {
    console.log(_this.objectType);
    console.log(_this.saveOrUpdate);
    if(_this.objectType == "CUSTOMER_LOCATION")
    {
      if(_this.saveOrUpdate == "S") {
        _this.locationModel.save(_this.toBeSaved);
      }
      else if (_this.saveOrUpdate == "U"){
        _this.locationModel.update(_this.toBeSaved);
      }

    }
    else if(_this.objectType == "POST")
    {

      if(_this.saveOrUpdate == "S") {
          _this.postModel.save(_this.toBeSaved);
      }
      else if(_this.saveOrUpdate == "E") {
          _this.editPostModel.editPost("e", _this.toBeSaved);
      }
      else if(_this.saveOrUpdate == "D") {
          _this.editPostModel.editPost("d", _this.toBeSaved);
      }
    }
     $('#reasonForChangeModal').modal('hide');
  };
}

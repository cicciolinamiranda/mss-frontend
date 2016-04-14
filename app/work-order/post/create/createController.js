module.exports = createCtrl;

var moment = require('moment');

/*@ngInject*/
function createCtrl($state, $stateParams, PostModel, CreatePostSvc) {
  var _this = this;
  var locationId = $stateParams.locationId;
  _this.model = new PostModel();

  _this.save = save;
  _this.cancel = cancel;
  _this.genderChoices = [];
  _this.selectedTraining = [];
  _this.selectedLicense = [];
  _this.selectedPostSkill = [];
  _this.selectedUniform = [];
  _this.selectedEquipment;
  _this.selectedHealthSafetyReq;
  _this.errMessage = "";

  //PostCover
  _this.postType = this.model.postCoverChoices;
  _this.getPostType = this.model.postCoverChoices;

  function init() {
    _this.post = _this.model.post;
    _this.post.customerLocationId = locationId;

    _this.callInFrequencyChoices = _this.model.callInFrequencyChoices;

    _this.model.getGenderChoices().then(function (response) {
      _this.genderChoices = response;
      if(_this.genderChoices && _this.genderChoices){
        _this.post.preferences.gender = _this.genderChoices[0];
      }
    });
  }

  init();

  function save(){
    CreatePostSvc.save(PostModel.transformPostJsonToDTO(_this.post)).then(function(response){
      if(response == "Failed"){
        _this.errMessage = 'Unable to save Post Record';
      }
      else if(response == "Duplicate"){
        _this.errMessage = 'Duplicate Post Name';
      }
      else{
        var postId = response.id;
        $state.go('post.view', {id: postId});
      }
    }, function(error) {
      _this.errMessage = error;
    });
  }

  function cancel() {
    $state.go('location.view', {id: locationId});
  }

}

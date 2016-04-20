module.exports = editPostCtrl;

var moment = require('moment');

/*@ngInject*/
function editPostCtrl($state, $stateParams, EditPostModel, EditPostSvc, PostModel) {
  var _this = this;
  var postId = $stateParams.id;

  //NOTE:
  //transactionParam = e == edit
  //transactionParam = d == duplicate
  _this.transactionParam = $stateParams.transaction;

  _this.model = new EditPostModel();
  _this.postModel = new PostModel();

  _this.selectedLanguage;
  _this.selectedPhysicalCondition;
  _this.selectedLicense;
  _this.selectedPostSkill;
  _this.selectedHealthSafetyReq;
  _this.selectedUniform;

  //PostCover
  _this.postRoleChoices = [];

  _this.update = update;
  _this.cancel = cancel;

  function init() {
    getAllRoles();

    _this.postModel.getGenderChoices().then(function (response) {
      _this.genderChoices = response;
    });

    _this.model.getPostDetails(postId).then(function (response) {
      _this.post = PostModel.formatPostDtoToJson(response.result);

      if(_this.transactionParam  === 'd'){
        _this.post.name += " (Copy)";
      }

      for (i = 0; i < _this.postModel.postCoverChoices.length; i++) {
        if(_this.postModel.postCoverChoices[i].id == _this.post.postCoverId) {
          _this.post.postCover = _this.postModel.postCoverChoices[i];
        }
      }
      //needed to properly tick radio button
      if(_this.genderChoices){
        for(i = 0; i < _this.genderChoices.length; i++){
          if(_this.genderChoices[i].id == _this.post.preferences.gender.id){
            _this.post.preferences.gender = _this.genderChoices[i];
          }
        }
      }

      _this.postModel.getCallInFrequencyChoices().then(function (response) {
        _this.callInFrequencyChoices = response;
        for(i = 0; i < _this.callInFrequencyChoices.length; i++){
          if(_this.callInFrequencyChoices[i].id == _this.post.callInFrequency.id){
            _this.post.callInFrequency = _this.callInFrequencyChoices[i];
          }
        }
      });
    });
  }

  init();

  function update(){
    _this.model.editPost(_this.transactionParam, _this.post);
  }

  function cancel() {
    $state.go('post.view', {id: postId});
  }

  function getAllRoles() {
    _this.postModel.getAllRoles().then(function (response) {
      _this.postRoleChoices = response;
    });
  }
}

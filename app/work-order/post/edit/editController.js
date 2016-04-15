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

  //PostCover
  _this.postType = this.postModel.postCoverChoices;
  _this.postRoleChoices = [];

  _this.update = update;
  _this.cancel = cancel;

  function init() {
    _this.callInFrequencyChoices = _this.postModel.callInFrequencyChoices;

    getAllRoles();

    _this.postModel.getGenderChoices().then(function (response) {
      _this.genderChoices = response;
    });

    _this.model.getPostDetails(postId).then(function (response) {
      _this.post =  PostModel.formatPostDtoToJson(response.result);

      //needed to properly tick radio button
      if(_this.genderChoices){
        for(i = 0; i < _this.genderChoices.length; i++){
          if(_this.genderChoices[i].id == _this.post.preferences.gender.id){
            _this.post.preferences.gender = _this.genderChoices[i];
          }
        }
      }

      var postCoverList = _this.postType;
      for (i = 0; i < postCoverList.length; i++) {
        if(postCoverList[i].id == _this.post.postCoverId) {
          _this.post.postCover = _this.postType[i];
        }
      }
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

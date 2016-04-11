module.exports = editPostCtrl;

var moment = require('moment');

/*@ngInject*/
function editPostCtrl($state, $stateParams, EditPostModel, EditPostSvc,PostModel) {
  var _this = this;
  var postId = $stateParams.id;

  //NOTE:
  //transactionParam = e == edit
  //transactionParam = d == duplicate
  var transactionParam = $stateParams.transaction;

  _this.model = new EditPostModel();
  _this.postModel = new PostModel();

  _this.selectedLanguage;
  _this.selectedPhysicalCondition;
  _this.selectedLicense;
  _this.selectedPostSkill;
  _this.selectedHealthSafetyReq;
  // _this.selectedReligion;
  // _this.selectedQualification;

  _this.update = update;

  function init() {
    _this.callInFrequencyChoices = _this.postModel.callInFrequencyChoices;
    _this.postCoverChoices = _this.postModel.postCoverChoices;

    _this.postModel.getGenderChoices().then(function (response) {
      _this.genderChoices = response;
    });

    _this.model.getPostDetails(postId).then(function (response) {
      _this.post =  PostModel.formatPostDtoToJson(response.result);
    });
  }

  init();

  function update(){
    _this.model.editPost(transactionParam, _this.post);
  }
}

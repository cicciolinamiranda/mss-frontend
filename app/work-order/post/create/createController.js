module.exports = createCtrl;

var moment = require('moment');

/*@ngInject*/
function createCtrl($state, $stateParams, PostModel, CreatePostSvc) {
  var _this = this;
  var locationId = $stateParams.locationId;
  _this.model = new PostModel();

  _this.save = save;
  _this.genderChoices = [];
  _this.selectedTraining = [];
  _this.selectedLicense = [];
  _this.selectedPostSkill = [];
  _this.selectedUniform = [];
  _this.selectedEquipment = [];

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
    CreatePostSvc.save(PostModel.getPostInDtoFormat()).then(function(response){
      var postId = response.id;
      console.log('Post ID',postId);
      $state.go('post.view', {id: postId});
    }, function(error) {
      _this.errMessage = error;
    });
  }
}

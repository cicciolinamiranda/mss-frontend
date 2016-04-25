module.exports = createCtrl;

var moment = require('moment');

/*@ngInject*/
function createCtrl($state, $stateParams, PostModel, CreatePostSvc, $scope) {
  var _this = this;
  var locationId = $stateParams.locationId;
  _this.model = new PostModel();

  _this.save = save;
  _this.cancel = cancel;
  _this.genderChoices = [];
  _this.callInFrequencyChoices = [];
  _this.selectedTraining;
  _this.selectedLicense;
  _this.selectedPostSkill;
  _this.selectedUniform;
  _this.selectedEquipment;
  _this.selectedHealthSafetyReq;
  _this.errMessage = "";

  //PostCover
  _this.postRoleChoices = [];

  function init() {
    _this.post = _this.model.post;
    _this.post.customerLocationId = locationId;
    _this.post.postCover = _this.model.postCoverChoices[0] || '';

    _this.model.getGenderChoices().then(function (response) {
      _this.genderChoices = response;
      if(_this.genderChoices && _this.genderChoices.length > 0){
        _this.post.preferences.gender = _this.genderChoices[0];
      }
    });

    _this.model.getCallInFrequencyChoices().then(function (response) {
      _this.callInFrequencyChoices = response;
      if(_this.callInFrequencyChoices && _this.callInFrequencyChoices.length > 0){
        _this.post.callInFrequency = _this.callInFrequencyChoices[0];
      }

      //comments
      _this.post.reasonForChange ="";
      _this.saveOrUpdate = "S";
      _this.objectType = "POST";
    });

    getAllRoles();
  }

  init();

  function save(){
    //check image to be uploaded first
    if(_this.post.image){
      _this.model.uploadImage(_this.post.image).then(
        function(response){
          _this.post.imageUrl = response.data.imageUrl;
          proceedWithSave(_this.post);
        },
        function(error){
          _this.errMessage = error.statusText;
        });
    }else{
      proceedWithSave(_this.post);
    }
  }

  function proceedWithSave(post){
    CreatePostSvc.save(PostModel.transformPostJsonToDTO(_this.post)).then(function(response){
      if(response == "Failed"){
        _this.errMessage = 'Unable to save Post Record';
      }
      else if(response == "Duplicate"){
        _this.errMessage = 'Duplicate Post Name';
      }
      else if(response == "Post name is required"){
        _this.errMessage = "Post name is required";
      }
      else{
        var postId = response.id;
        $state.go('post.view', {id: postId});
      }
    }, function(error) {
      _this.errMessage = error;
    });

    $('#reasonForChangeModal').modal('show');
    // CreatePostSvc.save(PostModel.transformPostJsonToDTO(_this.post)).then(function(response){
    //   if(response == "Failed"){
    //     _this.errMessage = 'Unable to save Post Record';
    //   }
    //   else if(response == "Duplicate"){
    //     _this.errMessage = 'Duplicate Post Name';
    //   }
    //   else if(response == "Post name is required"){
    //     _this.errMessage = "Post name is required";
    //   }
    //   else{
    //     var postId = response.id;
    //     $state.go('post.view', {id: postId});
    //   }
    // }, function(error) {
    //   _this.errMessage = error;
    // });
  }

  function cancel() {
    $state.go('location.view', {id: locationId});
  }

  function getAllRoles() {
    _this.model.getAllRoles().then(function (response) {
      _this.postRoleChoices = response;
    });
  }

  $scope.setFile = function(element) {
      $scope.$apply(function($scope) {
        if(element.files && element.files.length > 0){
          _this.post.image = element.files[0];
        }
      });
  };

}

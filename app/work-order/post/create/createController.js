module.exports = createCtrl;

var moment = require('moment');

/*@ngInject*/
function createCtrl($state, $stateParams, PostModel, CreatePostSvc) {
  var _this = this;
  _this.model = PostModel;

  _this.save = save;

  console.log('LocationId',$stateParams.locationId);
  _this.model.post.customerLocationId = $stateParams.locationId;
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

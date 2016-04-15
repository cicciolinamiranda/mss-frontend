module.exports = function(ngModule) {
  ngModule.factory('EditPostModel', editPostModel);
};

var moment = require('moment');

function editPostModel($state, EditPostSvc, PostModel) {
  var _this = this;

  function EditPostModel() {
  }

  EditPostModel.prototype.editPost = function(transaction, postDto){
    console.log(postDto);
    if(transaction === 'd'){
      postDto.id = null;

      EditPostSvc.save(PostModel.transformPostJsonToDTO(postDto)).then(function(response){
        var postId = response.id;
        $state.go('post.view', {id: postId});
      }, function(error) {
        console.log(error);
      });
    }else{

      EditPostSvc.update(PostModel.transformPostJsonToDTO(postDto)).then(function(response){
        var postId = response.id;
        $state.go('post.view', {id: postId});
      }, function(error) {
        console.log(error);
      });
    }

  }

  EditPostModel.prototype.getPostDetails = function(id){
    return EditPostSvc.getPostDetailsById(id).then(function (response) {
      return response;
    });
  }

  EditPostModel.prototype.hideFromDisplay = function(array, id){
    for(i= 0; i < array.length; i++){
      if(array[i].id === id){
        if(undefined !== array[i].deleted) {
          array[i].deleted = true;
        }

      }
    }
  }

  return EditPostModel;
}

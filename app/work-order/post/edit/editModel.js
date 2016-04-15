module.exports = function(ngModule) {
  ngModule.factory('EditPostModel', editPostModel);
};

var moment = require('moment');

function editPostModel($state, EditPostSvc, PostModel) {
  var _this = this;
  function EditPostModel() {
  }
  EditPostModel.prototype.errMessage = "";
  EditPostModel.prototype.selectedPostAllowances;
  EditPostModel.prototype.postAllowancesChoices = [];
  EditPostModel.prototype.editPost = function(transaction, postDto){

    if(transaction === 'd'){
      postDto.id = null;

      EditPostSvc.save(PostModel.transformPostJsonToDTO(postDto)).then(function(response){
        if(response == "Failed"){
            EditPostModel.prototype.errMessage = 'Unable to save Post Record';
        }
        else if(response == "Duplicate"){
          EditPostModel.prototype.errMessage = 'Duplicate Post Name';
        }
        else{
          var postId = response.id;
          $state.go('post.view', {id: postId});
        }
      }, function(error) {
        console.log(error);
      });
    }else{

      EditPostSvc.update(PostModel.transformPostJsonToDTO(postDto)).then(function(response){
        console.log("UPDAAATE POST-->"+JSON.stringify(response));
        if(response == "Failed"){
          EditPostModel.prototype.errMessage = 'Unable to save Post Record';
        }
        else if(response == "Duplicate"){
          EditPostModel.prototype.errMessage = 'Duplicate Post Name';
        }
        else{
          var postId = response.id;
          $state.go('post.view', {id: postId});
        }
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

  EditPostModel.prototype.addToArray = function addToArray(array, item){
    var newItem = angular.copy(item);
    newItem.deleted = false;
    if(array){

      for(i = 0; i < array.length; i++){
        if(array[i].id === newItem.id){
          return;
        }
      }

      array.push(newItem);
    }
  }

  EditPostModel.prototype.refreshPostAllowances = function(){
      PostModel.prototype.refreshPostAllowances();
      EditPostModel.prototype.postAllowancesChoices = PostModel.prototype.postAllowancesChoices;
  }

  return EditPostModel;
}

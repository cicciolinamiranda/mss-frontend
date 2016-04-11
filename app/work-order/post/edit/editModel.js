module.exports = function(ngModule) {
  ngModule.factory('EditPostModel', editPostModel);
};

var moment = require('moment');

function editPostModel($state, EditPostSvc) {
  var _this = this;

  function EditPostModel() {
  }

  EditPostModel.prototype.editPost = function(transaction, postDto){
    if(transaction === 'd'){
      postDto.id = null;
    }
    EditPostSvc.update(getPostInDtoFormat(postDto)).then(function(response){
      var postId = response.id;
      $state.go('post.view', {id: postId});
    }, function(error) {
      console.log(error);
    });
  }

  EditPostModel.prototype.getPostDetails = function(id){
    return EditPostSvc.getPostDetailsById(id).then(function (response) {
      return response;
    });
  }

  function getPostInDtoFormat(post){
    return{
      id: post.id,
      customerLocationId: post.customerLocationId,
      name: post.name,
      isIdentificationRequired: post.isIdentificationRequired,
      numberOfEmployees: post.numberOfEmployees,
      startTimeStr: moment(post.startTime).format("HH:mm"),
      endTimeStr: moment(post.endTime).format("HH:mm"),
      hours: post.hours,
      isBookOn: post.isBookOn,
      isBookOff: post.isBookOff,
      isCallIn: post.isCallIn,
      notes: post.notes
    }
  }

  return EditPostModel;
}

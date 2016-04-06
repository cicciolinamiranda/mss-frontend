module.exports = function(ngModule) {
  ngModule.factory('ViewPostModel', viewPostModel);
};

function viewPostModel(ViewPostSvc) {
  var _this = this;

  _this.editPost = editPost;
  _this.getPostDetails = getPostDetails;

  function editPost(id){
    //TODO Placeholder
  }

  function getPostDetails(id){
    var post = ViewPostSvc.getPostDetailsById(id);

    if(post.isCallIn == "No"){
      post.callInValue = post.isCallIn;
    }else{
      post.callInValue = post.callInFrequency;
    }

    return post;
  }

  return _this;
}

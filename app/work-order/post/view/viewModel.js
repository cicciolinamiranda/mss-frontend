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
    return ViewPostSvc.getPostDetailsById(id);
  }

  return _this;
}

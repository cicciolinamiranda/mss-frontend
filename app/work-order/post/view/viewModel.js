module.exports = function(ngModule) {
  ngModule.factory('ViewPostModel', viewPostModel);
};

function viewPostModel($state, ViewPostSvc) {
  var _this = this;

  _this.editPost = editPost;
  _this.getPostDetails = getPostDetails;

  function editPost(transaction, id){
    $state.go('post.edit', {
      transaction: transaction,
      id: id});
  }

  function getPostDetails(id){
    return ViewPostSvc.getPostDetailsById(id).then(function (response) {
      return response;
    });
  }

  return _this;
}

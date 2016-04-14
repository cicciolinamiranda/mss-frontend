module.exports = viewPostCtrl;

/*@ngInject*/
function viewPostCtrl(ViewPostModel, PostModel, $state, $stateParams) {
  var _this = this;
  var postId = $stateParams.id;
  _this.model = ViewPostModel;
  _this.postModel = new PostModel();
  _this.post;

  function init() {
    getPostDetails();
  }

  init();

  function getPostDetails() {
    _this.model.getPostDetails(postId).then(function (response) {
      _this.post =  response.result;

      if(_this.postModel.postCoverChoices && _this.postModel.postCoverChoices.length > 0){
        for(i = 0; i < _this.postModel.postCoverChoices.length; i++){
          if(_this.post.postCover === _this.postModel.postCoverChoices[i].id){
            _this.post.postCover = _this.postModel.postCoverChoices[i].name;
          }
        }
      };

    });
  }
}

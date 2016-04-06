module.exports = viewPostCtrl;

/*@ngInject*/
function viewPostCtrl(ViewPostModel, $state, $stateParams) {
  var _this = this;
  var postId = $stateParams.id;
  _this.model = ViewPostModel;
  _this.post;

  function init() {
    _this.post = _this.model.getPostDetails(postId);
  }

  init();

}

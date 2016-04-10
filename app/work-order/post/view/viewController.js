module.exports = viewPostCtrl;

/*@ngInject*/
function viewPostCtrl(ViewPostModel, $state, $stateParams) {
  var _this = this;
  var postId = $stateParams.id;
  _this.model = ViewPostModel;
  _this.post;

  function init() {
    getPostDetails();
  }

  init();

  function getPostDetails() {
    _this.model.getPostDetails(postId).then(function (response) {
      console.log("RETURN--->"+JSON.stringify(response.result));
      _this.post =  response.result;
    });
  }
}

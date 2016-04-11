module.exports = editPostCtrl;

var moment = require('moment');

/*@ngInject*/
function editPostCtrl($state, $stateParams, EditPostModel, EditPostSvc,PostModel) {
  var _this = this;
  var postId = $stateParams.id;
  //NOTE:
  //transactionParam = e == edit
  //transactionParam = d == duplicate
  var transactionParam = $stateParams.transaction;

  _this.model = new EditPostModel();
  _this.save = save;

  function init() {
    _this.model.getPostDetails(postId).then(function (response) {
      _this.post =  response.result;
      _this.post.hours = moment(_this.post.hours).format("HH:mm");
    });
  }

  init();

  function save(){
    _this.model.editPost(transactionParam, _this.post);
  }
}

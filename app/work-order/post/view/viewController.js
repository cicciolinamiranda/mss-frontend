module.exports = viewPostCtrl;
var moment = require('moment');
/*@ngInject*/
function viewPostCtrl(ViewPostModel, PostModel, $state, $stateParams) {
  var _this = this;
  var postId = $stateParams.id;
  _this.model = ViewPostModel;
  _this.postModel = new PostModel();
  _this.post;

  //auditlogs trigger
  _this.objectType = "post";
  function init() {
    getPostDetails();
  }

  init();

  function getPostDetails() {
    _this.model.getPostDetails(postId).then(function (response) {
      _this.post =  response.result;
      _this.post.hours = moment(moment(_this.post.endTime, "HH:mm").toDate()).diff(moment(moment(_this.post.startTime, "HH:mm").toDate()), 'hours');
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

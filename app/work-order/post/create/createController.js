module.exports = createCtrl;

var moment = require('moment');

/*@ngInject*/
function createCtrl($state, $stateParams, PostModel) {
  var _this = this;
  _this.post = PostModel.post;

}

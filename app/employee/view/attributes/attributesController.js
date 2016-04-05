module.exports = attributesCtr;

/*@ngInject*/ function attributesCtr(AttributesSvc) {
  var _this = this;

  function init() {
    AttributesSvc.getAttributes(_this.employee).then(function(attributes){
    _this.attributes = attributes;
    });
  }

  init();
}

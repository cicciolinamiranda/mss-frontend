module.exports = mapCtrl;

function mapCtrl(NgMap) {
  "ngInject";
  var _this = this;
  _this.address = "";
  _this.initialCoordinates = {};
  _this.marker;
 _this.onMarkerDragEnd = onMarkerDragEnd;

  var input = /** @type {!HTMLInputElement} */(
      document.getElementById('pac-input'));

  function init() {
    console.log("init");
    _this.googleMapsUrl="https://maps.google.com/maps/api/js?libraries=places";

    NgMap.getMap().then(function(map) {
      _this.map = map;
      _this.marker = _this.map.marker;
      _this.initialCoordinates = map.getCenter();
      //position textbox within map
      _this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    });
  }

  init();

  function onMarkerDragEnd(){
      console.log("I have been dragged");
  }
}

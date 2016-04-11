module.exports = mapCtrl;

/*@ngInject*/ function mapCtrl($scope, NgMap) {
  var _this = this;
  _this.initialCoordinates = {};
  _this.markerPosition;
  _this.latitude;
  _this.longitude;
  _this.alertMessage;
  _this.onMarkerDragEnd = onMarkerDragEnd;
  _this.placeChanged = placeChanged;
  _this.map = {};

  var input = /** @type {!HTMLInputElement} */(
      document.getElementById('txtAutocomplete'));

  function init() {
    NgMap.getMap({id:'mapId'}).then(function(map) {
      _this.map = map;

      if(_this.editlatitude && _this.editlongitude){
        _this.initialCoordinates = new google.maps.LatLng(parseFloat(_this.editlatitude),parseFloat(_this.editlongitude));
        _this.map.setCenter({lat: parseFloat(_this.editlatitude), lng: parseFloat(_this.editlongitude)});
        _this.map.markers.mapMarker.setPosition({lat: parseFloat(_this.editlatitude), lng: parseFloat(_this.editlongitude)});
      }

      //position textbox within map
      _this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    });

    //if not from edit page
    if(!(_this.editlatitude && _this.editlongitude)){
      geolocate();
    }
  }

  init();

  function onMarkerDragEnd(){
      _this.alertMessage = "";

      var pos = this.getPosition();
      setCoordinates(pos.lat(), pos.lng());
      _this.map.setCenter(pos);
      reverseGeocode(pos);
  }

  function reverseGeocode(coordinates){
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode({'location': coordinates}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          setAddressInInput(results[0].formatted_address);
          $scope.$apply();
        } else {
          _this.alertMessage = "No corresponding address found";
        }
      } else {
         _this.alertMessage = "Geocoder failed due to: " + status;
      }
    });
  }

  //autocomplete event
  function placeChanged(){
    _this.alertMessage = "";

    var place = this.getPlace();

    if (!place.geometry) {
      //search using places search
      var service = new google.maps.places.PlacesService(_this.map);
      service.textSearch({
        query: document.getElementById('txtAutocomplete').value
      }, searchCallBack);
    }else{
      setAddressInInput(place.formatted_address);
      setCoordinates(place.geometry.location.lat(), place.geometry.location.lng());
      _this.map.setCenter(place.geometry.location);
      _this.markerPosition = place.geometry.location;
    }

    $scope.$apply();
  }

  //places search
  function searchCallBack(results, status){
    _this.alertMessage = "";
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      setPositionOnMap(results[0].geometry.location);
      setAddressInInput(results[0].formatted_address);
      setCoordinates(results[0].geometry.location.lat(), results[0].geometry.location.lng());
    }

    if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
      _this.alertMessage = "No match found. Returning to original location. Please manually drag the pin to the correct location.";
      setPositionOnMap(_this.initialCoordinates);
      setCoordinates(_this.initialCoordinates.lat(), _this.initialCoordinates.lng());
      reverseGeocode(_this.initialCoordinates);
    }

      $scope.$apply();
  }

  function geolocate(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          _this.initialCoordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          reverseGeocode(_this.initialCoordinates);
          setCoordinates(_this.initialCoordinates.lat, _this.initialCoordinates.lng);
          _this.markerPosition = _this.initialCoordinates;
        }, function() {
          _this.alertMessage = "No results found";
        });
      } else {
        _this.alertMessage = "Your browser does not support Geolocation. Please use another browser or update your current browser.";
      }
  }

  function setPositionOnMap(coordinates){
    _this.map.setCenter(coordinates);
    _this.markerPosition = coordinates;
  }

  function setAddressInInput(address){
      _this.address = address;
      _this.editaddress = address;
  }

  function setCoordinates(lat, lng){
    _this.latitude = lat;
    _this.longitude = lng;
    //for editaddress
    _this.editlatitude = lat;
    _this.editlongitude = lng;
  }

}

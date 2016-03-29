module.exports = function(ngModule) {
  ngModule.service('CreateLocationSvc', createLocationService);
};

function createLocationService($http, $q) {

  var _this = this;
  _this.modeOfTransportMock;

  _this.getMockModeOfTransport = getMockModeOfTransport;

  function getMockModeOfTransport(){
    var def = $q.defer();

    $http.get("http://localhost:3000/modeOfTransport")
         .success(function(response) {
              _this.modeOfTransportMock = response;
              def.resolve(response);
            })
          .error(function() {
              def.reject("Failed to get albums");
          });
    return def.promise;
  }
}

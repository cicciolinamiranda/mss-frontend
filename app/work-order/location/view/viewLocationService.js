module.exports = function(ngModule) {
  ngModule.service('ViewLocationSvc', viewLocationService);
};

function viewLocationService($http, $q, $gapi, WORKORDER_GAPI_BASE) {

  var _this = this;

  _this.getLocationDetails = getLocationDetails;
  _this.getPostDetailsList = getPostDetailsList;
  _this.updateStatus = updateStatus;
  _this.locDetails;

  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function () {
    return $gapi.load('customerContract', 'v1', WORKORDER_GAPI_BASE);
  }).then(function () {
    return deferred.resolve();
  });


  function getLocationDetails(id){
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.customer.location.get({'id' : id});
      def.resolve(response);
    }).then(function (data) {
      def.resolve(data);
    });
    return def.promise;
  }

  function updateStatus(id,status) {
    var def = $q.defer();
    var deferred2 = $q.defer();
    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.customer.location.update_status(
        {'id' : id, 'status':status, 'reasonForChange':"Archived"}
      );
    }).then(function (data) {
      def.resolve(data);
    });
    return def.promise;
  }
  function getPostDetailsList(customerLocationId){
    var def = $q.defer();
    loadApi.then(function () {
      return $gapi.client.customerContract.workorder.customer.location.post.list({'locationId' : customerLocationId});
    def.resolve(response);
    }).then(function (data) {
      def.resolve(data.items);
    });
    return def.promise;
  }

}

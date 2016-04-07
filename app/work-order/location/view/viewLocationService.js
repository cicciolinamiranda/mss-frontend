module.exports = function(ngModule) {
  ngModule.service('ViewLocationSvc', viewLocationService);
};

function viewLocationService($http, $q, $gapi, WORKORDER_GAPI_BASE, MOCK_BASE) {

  var _this = this;

  _this.getLocationDetails = getLocationDetails;
  _this.getBilledCostType = getBilledCostType;
  _this.getPostDetailsList = getPostDetailsList;
  _this.archiveLocation = archiveLocation;
  _this.locDetails;

  var deferred = $q.defer();
  var loadApi = deferred.promise;

  $gapi.loaded.then(function () {
    return $gapi.load('workorder', 'v1', WORKORDER_GAPI_BASE);
  }).then(function () {
    return deferred.resolve();
  });


  function getLocationDetails(id){
    var def = $q.defer();

    loadApi.then(function () {
      return $gapi.client.workorder.customer.location.get({'id' : id});
      def.resolve(response);
    }).then(function (data) {
      def.resolve(data);
    });
    return def.promise;
  }

  function getBilledCostType(id){
    var def = $q.defer();

    $http.get(MOCK_BASE + "/billedCostType", {params:{"id": id}})
         .success(function(response) {
              _this.billedCostType = response;
              def.resolve(response);
            })
          .error(function() {
              def.reject("Server is down.");
          });
    return def.promise;
  }

  function archiveLocation(id) {
    var def = $q.defer();
    var status = "ARCHIVE";
    var deferred2 = $q.defer();
    loadApi.then(function () {
      return $gapi.client.workorder.customer.location.update_status(
        {'id' : id, 'status':status}
      );
    }).then(function (data) {
      def.resolve(data);
    });
    return def.promise;
  }

  function getPostDetailsList(id){
    var def = $q.defer();
    var data = [{
      name: "VIP Conference Room",
      id: "00001-01-01",
      numEmployees: "0",
      postCover: "168",
      role: "Security Guard",
      isIdRequired: "Yes",
      postLicense: [{
        id: 1,
        name: "Passport"
      }],
      skills: [],
      uniforms: [],
      equipments: [{
        id: "1",
        name: "Gun",
        quantity: "3"
      },
      {
        id: "3",
        name: "Baton",
        quantity: "3"
      }],
      gender: {
        id: "1",
        name: "Male"
      },
      languages: [],
      trainings: [],
      physicalConditions: [],
      religions: [],
      notes: "Loren Ipsum",
      healthAndSafety: [],
      height: [],
      chargeRates: "34.00",
      allowances: [],
      imageSource: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1325"
    },
    {
      name: "Quiet Room",
      id: "00001-01-02",
      numEmployees: "0",
      postCover: "168",
      role: "Security Guard",
      isIdRequired: "Yes",
      postLicense: [{
        id: 1,
        name: "Passport"
      }],
      skills: [],
      uniforms: [],
      equipments: [{
        id: "1",
        name: "Gun",
        quantity: "3"
      },
      {
        id: "3",
        name: "Baton",
        quantity: "3"
      }],
      gender: {
        id: "1",
        name: "Male"
      },
      languages: [],
      trainings: [],
      physicalConditions: [],
      religions: [],
      notes: "Loren Ipsum",
      healthAndSafety: [],
      height: [],
      chargeRates: "34.00",
      allowances: [],
      imageSource: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1325"
    },
    {
      name: "Front Desk",
      id: "00001-01-03",
      numEmployees: "0",
      postCover: "168",
      role: "Security Guard",
      isIdRequired: "Yes",
      postLicense: [{
        id: 1,
        name: "Passport"
      }],
      skills: [],
      uniforms: [],
      equipments: [{
        id: "1",
        name: "Gun",
        quantity: "3"
      },
      {
        id: "3",
        name: "Baton",
        quantity: "3"
      }],
      gender: {
        id: "1",
        name: "Male"
      },
      languages: [],
      trainings: [],
      physicalConditions: [],
      religions: [],
      notes: "Loren Ipsum",
      healthAndSafety: [],
      height: [],
      chargeRates: "34.00",
      allowances: [],
      imageSource: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1325"
    }
  ];
    def.resolve(data);
    return def.promise;
  }

}

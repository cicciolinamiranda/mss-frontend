module.exports = function(ngModule) {
  ngModule.service('ViewPostSvc', viewPostService);
};

//TODO Replace with actual calls
function viewPostService() {
  var _this = this;
  _this.getPostDetailsById = getPostDetailsById;

  function getPostDetailsById(id){
    return {
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
      imageSource: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1325",
      isBooked: "Yes",
      isCallIn: "Yes",
      callInFrequency: "Every 30 min"
    };
  }
}

module.exports = viewPostCtrl;

/*@ngInject*/
function viewPostCtrl($state, $stateParams) {
  var _this = this;
  _this.postId = $stateParams.id;
  _this.post = {
    name: "Front Desk",
    id: "00001-01-01",
    numEmployees: "0",
    postCover: "168",
    role: "Lobby Ambassador",
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
    height: []
  };

  function init() {
  }

  init();

  _this.editLocation = function(id){
    //TODO Placeholder
  }
}

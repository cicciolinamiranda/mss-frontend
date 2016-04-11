module.exports = function(ngModule) {
  ngModule.factory('PostModel', PostModel);
};
var moment = require('moment');

function PostModel(PostService) {
  var _this = this;

  _this.post = {};

  _this.post.customerLocationId = undefined;
  _this.post.name = '';
  _this.post.identificationRequired = true;
  _this.post.numberOfEmployees = 1;
  _this.post.startTime = moment("09:00", "HH:mm").toDate();
  _this.post.endTime = moment("17:00", "HH:mm").toDate();
  _this.post.hours = function(){ return moment(_this.post.endTime).diff(moment(_this.post.startTime), 'hours'); };
  _this.post.chargeRate = 0;
  _this.post.bookOn = true;
  _this.post.bookOff = true;
  _this.post.callIn = true;
  _this.post.notes = '';

  // service utility methods
  _this.post.addToArray = PostService.addToArray();
  _this.post.removeFromArray = PostService.removeFromArray();

  // selected list component
  _this.post.selectedLicense;
  _this.post.selectedSkill;
  _this.post.selectedUniform;
  _this.post.selectedEquipment;

  _this.callInFrequencyChoices = [
    {id:'EVERY_30_MIN', name:'Every 30 mins'},
    {id:'EVERY_1_HR', name:'Every 1 hr'},
    {id:'EVERY_2_HR', name:'Every 2 hrs'}
  ];
  _this.post.callInFrequency = _this.callInFrequencyChoices[0];

  //customer preferences
  _this.post.preferences = {};
  PostService.getGenderValues().then(function(items){
    _this.genderChoices = items;
    _this.post.preferences.gender = _this.genderChoices[0];
  },function(error){
    console.log(error);
  });

  //custpref:trainings
  _this.trainingChoices = [];
  _this.post.preferences.trainings = [];

  //custpref:languages
  _this.languageChoices = [];
  _this.post.preferences.languages = [];

  //custpref:physical conditions
  _this.physicalConditionChoices = [];
  _this.post.preferences.physicalConditions = [];

  _this.getPostInDtoFormat = function(){
    return{
      customerLocationId: _this.post.customerLocationId,
      name: _this.post.name,
      identificationRequired: _this.post.identificationRequired,
      numberOfEmployees: _this.post.numberOfEmployees,
      startTimeStr: moment(_this.post.startTime).format("HH:mm"),
      endTimeStr: moment(_this.post.endTime).format("HH:mm"),
      hours: _this.post.hours(),
      chargeRate: _this.post.chargeRate,
      bookOn: _this.post.bookOn,
      bookOff: _this.post.bookOff,
      callIn: _this.post.callIn,
      notes: _this.post.notes,
      preferences: _this.post.preferences
    }
  }

  _this.refreshTrainingSearch = function(keyword) {
    PostService.searchTrainings(keyword).then(function (response) {
      _this.trainingChoices = response;
    }, function (error) {
      _this.errMessage = error;
    });
  }

  _this.refreshLanguageSearch = function(keyword) {
    PostService.searchLanguages(keyword).then(function (response) {
      _this.languageChoices = response;
    }, function (error) {
      _this.errMessage = error;
    });
  }

  _this.refreshPhysicalConditionSearch = function(keyword) {
    PostService.searchPhysicalConditions(keyword).then(function (response) {
      _this.physicalConditionChoices = response;
    }, function (error) {
      _this.errMessage = error;
    });
  }

  // multi-select list components
  _this.post.licenses = [];
  _this.post.skills = [];
  _this.post.uniforms = [];
  _this.post.equipments = [];

  _this.post.getAllLicenses = PostService.getAllLicenses().then(
      function (response) {
        _this.post.licenses = response;
      },
      function (error) {
        console.log(error);
      }
  );

  _this.post.getAllSkills = PostService.getAllPostSkills().then(
      function (response) {
        _this.post.skills = response;
      },
      function (error) {
        console.log(error);
      }
  );

  _this.post.getAllUniforms = PostService.getAllUniforms().then(
      function (response) {
        _this.post.uniforms = response;
      },
      function (error) {
        console.log(error);
      }
  );

  _this.post.getAllEquipments = PostService.getAllEquipments().then(
      function (response) {
        _this.post.equipments = response;
      },
      function (error) {
        console.log(error);
      }
  );

  _this.removeFromArray = function(array, id) {
    for (i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        array.splice(i, 1);
      }
    }
  }

  _this.addToArray = function(array, item) {
    var newItem = angular.copy(item);

     for(i = 0; i < array.length; i++){
       if(array[i].id === newItem.id){
         return;
       }
     }

     array.push(newItem);
  }

  return _this;
}

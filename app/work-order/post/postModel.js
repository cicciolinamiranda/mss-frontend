module.exports = function(ngModule) {
  ngModule.factory('PostModel', PostModel);
};
var moment = require('moment');

function PostModel(PostService) {
  var _this = this;

  function PostModel() {
    this.callInFrequencyChoices = setCallInFrequencyChoices();
    this.post = setDefaultPost();
  }

  function setCallInFrequencyChoices(){
    var callInFrequencyChoices = [
      {id:'EVERY_30_MIN', name:'Every 30 mins'},
      {id:'EVERY_1_HR', name:'Every 1 hr'},
      {id:'EVERY_2_HR', name:'Every 2 hrs'}
    ];

    return callInFrequencyChoices;
  }

  function setDefaultPost(){
    var post = {
      customerLocationId: undefined,
      name: '',
      identificationRequired: true,
      numberOfEmployees: 1,
      startTime: moment("09:00", "HH:mm").toDate(),
      endTime: moment("17:00", "HH:mm").toDate(),
      hours: function(){ return moment(endTime).diff(moment(startTime), 'hours'); },
      chargeRate: 0,
      bookOn: true,
      bookOff: true,
      callIn: true,
      notes: '',
      preferences: {
        trainings: [],
        languages: [],
        physicalConditions: []
      }
    };

    var callFrequencyChoices = setCallInFrequencyChoices();
    if(callFrequencyChoices && callFrequencyChoices.length > 0){
        post.callInFrequency = callFrequencyChoices[0];
    }



    return post;
  }

  //customer preferences
  PostModel.prototype.getGenderChoices = function(){
    return PostService.getGenderValues().then(function (response) {
      return response;
    });
  }

  //custpref:trainings
  PostModel.prototype.trainingChoices = [];

  //custpref:languages
  PostModel.prototype.languageChoices = [];

  //custpref:physical conditions
  PostModel.prototype.physicalConditionChoices = [];

  PostModel.getPostInDtoFormat = function(post){
    return{
      customerLocationId: post.customerLocationId,
      name: post.name,
      identificationRequired: post.identificationRequired,
      numberOfEmployees: post.numberOfEmployees,
      startTimeStr: moment(post.startTime).format("HH:mm"),
      endTimeStr: moment(post.endTime).format("HH:mm"),
      hours: post.hours(),
      chargeRate: post.chargeRate,
      bookOn: post.bookOn,
      bookOff: post.bookOff,
      callIn: post.callIn,
      notes: post.notes,
      preferences: post.preferences
    }
  }

  PostModel.prototype.refreshTrainingSearch = function(keyword) {
    PostService.searchTrainings(keyword).then(function (response) {
      PostModel.prototype.trainingChoices = response;
    }, function (error) {
      _this.errMessage = error;
    });
  }

  PostModel.prototype.refreshLanguageSearch = function(keyword) {
    PostService.searchLanguages(keyword).then(function (response) {
      PostModel.prototype.languageChoices = response;
    }, function (error) {
      _this.errMessage = error;
    });
  }

  PostModel.prototype.refreshPhysicalConditionSearch = function(keyword) {
    PostService.searchPhysicalConditions(keyword).then(function (response) {
      PostModel.prototype.physicalConditionChoices = response;
    }, function (error) {
      _this.errMessage = error;
    });
  }

  PostModel.prototype.removeFromArray = function(array, id) {
    for (i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        array.splice(i, 1);
      }
    }
  }

  PostModel.prototype.addToArray = function(array, item) {
    var newItem = angular.copy(item);

     for(i = 0; i < array.length; i++){
       if(array[i].id === newItem.id){
         return;
       }
     }

     array.push(newItem);
  }

  return PostModel;
}

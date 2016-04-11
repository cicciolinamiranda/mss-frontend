module.exports = function (ngModule) {
  ngModule.factory('PostModel', PostModel);
};
var moment = require('moment');

function PostModel(PostService) {
  var _this = this;

  function PostModel() {
    this.callInFrequencyChoices = setCallInFrequencyChoices();
    this.postCoverChoices = setPostCoverChoices();
    this.post = setDefaultPost();
  }

  function setCallInFrequencyChoices() {
    var callInFrequencyChoices = [
      {id: 'EVERY_30_MIN', name: 'Every 30 mins'},
      {id: 'EVERY_1_HR', name: 'Every 1 hr'},
      {id: 'EVERY_2_HR', name: 'Every 2 hrs'}
    ];

    return callInFrequencyChoices;
  }

  function setPostCoverChoices(){
    var postCover = [
      {id: 'ONE_SIX_EIGHT', name: '168 HOURS'},
      {id: 'TWENTY_FOUR_SEVEN', name: '24/7'}
    ];

    return postCover;
  }

  function setDefaultPost() {
    var post = {
      customerLocationId: undefined,
      name: '',
      identificationRequired: true,
      numberOfEmployees: 1,
      startTime: moment("09:00", "HH:mm").toDate(),
      endTime: moment("17:00", "HH:mm").toDate(),
      hours: function () {
        return moment(endTime).diff(moment(startTime), 'hours');
      },
      chargeRate: 0,
      bookOn: true,
      bookOff: true,
      callIn: true,
      notes: '',
      preferences: {
        trainings: [],
        languages: [],
        physicalConditions: []
      },
      licenses: [],
      postSkills: [],
      uniforms: [],
      equipments: []
    };

    var callFrequencyChoices = setCallInFrequencyChoices();
    if (callFrequencyChoices && callFrequencyChoices.length > 0) {
      post.callInFrequency = callFrequencyChoices[0];
    }

    return post;
  }

  function checkListIfNull(list) {
    if(undefined == list)
    {
      list = [];
    }
    return list;
  }

  //customer preferences
  PostModel.prototype.getGenderChoices = function () {
    return PostService.getGenderValues().then(function (response) {
      return response;
    });
  };

  //custpref:trainings
  PostModel.prototype.trainingChoices = [];

  //custpref:languages
  PostModel.prototype.languageChoices = [];

  //custpref:physical conditions
  PostModel.prototype.physicalConditionChoices = [];

  // list components
  PostModel.prototype.licenseChoices = [];
  PostModel.prototype.postSkillChoices = [];
  PostModel.prototype.uniformChoices = [];
  PostModel.prototype.equipmentChoices = [];

  //json to dto
  PostModel.transformPostJsonToDTO = function(post){
    //id should be null during duplicate and create
    var post = {
      'id': post.id,
      'customerLocationId': post.customerLocationId,
      'name': post.name,
      'isIdentificationRequired': post.identificationRequired,
      'numberOfEmployees': post.numberOfEmployees,
      'startTimeStr': moment(post.startTime).format("HH:mm"),
      'endTimeStr': moment(post.endTime).format("HH:mm"),
      'hours': post.hours,
      'isBookOn': post.bookOn,
      'isBookOff': post.bookOff,
      'isCallIn': post.callIn,
      'notes': post.notes,
      'preferences': post.preferences,
      'licenses':checkListIfNull(post.licenses),
      'skills': checkListIfNull(post.skills),
      'uniforms': checkListIfNull(post.uniforms),
      'equipments': post.equipments,
      'preferences': {
        // 'religions': post.preferences.religions, TODO: Uncomment once ok in backend
        // 'qualifications':post.preferences.qualifications, TODO: Uncomment once ok in backend
        // 'gender':post.preferences.gender, TODO: Uncomment once ok in backend
        'trainings': post.preferences.trainings,
        'languages':post.preferences.languages,
        'physicalConditions':post.preferences.physicalConditions,
        'height': post.preferences.height
      },
      'postCover': post.postCover
      // 'role': post.role TODO: Uncomment once ok in backend
    };

    return post;
  }

  PostModel.prototype.refreshTrainingSearch = function (keyword) {
    PostService.searchTrainings(keyword).then(function (response) {
      PostModel.prototype.trainingChoices = response;
    }, function (error) {
      _this.errMessage = error;
    });
  };

  PostModel.prototype.refreshLanguageSearch = function (keyword) {
    PostService.searchLanguages(keyword).then(function (response) {
      PostModel.prototype.languageChoices = response;
    }, function (error) {
      _this.errMessage = error;
    });
  };

  PostModel.prototype.refreshPhysicalConditionSearch = function (keyword) {
    PostService.searchPhysicalConditions(keyword).then(function (response) {
      PostModel.prototype.physicalConditionChoices = response;
    }, function (error) {
      _this.errMessage = error;
    });
  };

  PostModel.prototype.refreshLicenses = function () {
    PostService.getAllLicenses().then(function (response) {
          PostModel.prototype.licenseChoices = response;
        }, function (error) {
          _this.errMessage = error;
        }
    );
  };

  PostModel.prototype.refreshPostSkills = function () {
    PostService.getAllPostSkills().then(function (response) {
          PostModel.prototype.postSkillChoices = response;
        }, function (error) {
          _this.errMessage = error;
        }
    );
  };

  PostModel.prototype.refreshUniforms = function () {
    PostService.getAllUniforms().then(function (response) {
          PostModel.prototype.uniformChoices = response;
        }, function (error) {
          _this.errMessage = error;
        }
    );
  };

  PostModel.prototype.refreshEquipments = function () {
    PostService.getAllEquipments().then(function (response) {
          PostModel.prototype.equipmentChoices = response;
        }, function (error) {
          _this.errMessage = error;
        }
    );
  };

  PostModel.prototype.removeFromArray = function (array, id) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        array.splice(i, 1);
      }
    }
  };

  PostModel.prototype.addToArray = function (array, item) {
    var newItem = angular.copy(item);

    for (var i = 0; i < array.length; i++) {
      if (array[i].id === newItem.id) {
        return;
      }
    }

    array.push(newItem);
  };

  return PostModel;
}

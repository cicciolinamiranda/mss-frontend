module.exports = function (ngModule) {
  ngModule.factory('PostModel', PostModel);
};
var moment = require('moment');

function PostModel(PostService) {
  var _this = this;

  function PostModel() {
    this.postCoverChoices = setPostCoverChoices();
    this.post = setDefaultPost();
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
      hours: moment(moment("17:00", "HH:mm").toDate()).diff(moment(moment("09:00", "HH:mm").toDate()), 'hours'),
      chargeRate: 0,
      bookOn: true,
      bookOff: true,
      callIn: true,
      notes: '',
      preferences: {
        trainings: [],
        languages: [],
        physicalConditions: [],
        qualifications: [],
        religions: []
      },
      licenses: [],
      postSkills: [],
      uniforms: [],
      equipments: [],
      postCover:'',
      role:null,
      healthSafetyRequirements:[]
    };

    return post;
  }

  function checkListIfNull(list) {
    if(undefined == list)
    {
      list = [];
    }
    return list;
  }

  function checkEquipmentQuantity(list){
    if(list.length > 0){
      for(i = 0; i < list.length; i++){
        if(!list[i].quantity){
          list[i].quantity = 0;
        }
      }
    }
    return list;
  }

  PostModel.prototype.getAllRoles = function () {
    return PostService.getAllRoles().then(function (response) {
      return response;
    });
  };

  PostModel.prototype.getCallInFrequencyChoices = function () {
    return PostService.getCallInFrequencies().then(function (response) {
      return response;
    });
  };

  //customer preferences
  PostModel.prototype.getGenderChoices = function () {
    return PostService.getGenderValues().then(function (response) {
      return response;
    });
  };

  //Customer Preferences
  PostModel.prototype.trainingChoices = [];
  PostModel.prototype.languageChoices = [];
  PostModel.prototype.physicalConditionChoices = [];

  // list components
  PostModel.prototype.licenseChoices = [];
  PostModel.prototype.postSkillChoices = [];
  PostModel.prototype.uniformChoices = [];
  PostModel.prototype.equipmentChoices = [];
  PostModel.prototype.healthSafetyRequirementsChoices = [];
  PostModel.prototype.qualificationChoices = [];
  PostModel.prototype.religionChoices = [];
  PostModel.prototype.rolesChoices = [];

  //json to dto
  PostModel.transformPostJsonToDTO = function(post){
    var postDTO = {
      'id': post.id,
      'customerLocationId': post.customerLocationId,
      'name': post.name,
      'isIdentificationRequired': post.identificationRequired,
      'numberOfEmployees': post.numberOfEmployees,
      'startTime': moment(post.startTime).format("HH:mm"),
      'endTime': moment(post.endTime).format("HH:mm"),
      'hours': post.hours,
      'bookOn': post.bookOn,
      'bookOff': post.bookOff,
      'callIn': post.callIn,
      'notes': post.notes,
      'preferences': post.preferences,
      'licenses':checkListIfNull(post.licenses),
      'skills': checkListIfNull(post.postSkills),
      'uniforms': checkListIfNull(post.uniforms),
      'equipments': checkEquipmentQuantity(checkListIfNull(post.equipments)),
      'healthSafetyRequirements': checkListIfNull(post.healthSafetyRequirements),
      'preferences': {
        'religions': post.preferences.religions,
        'qualifications':post.preferences.qualifications,
        'gender': post.preferences.gender,
        'trainings': post.preferences.trainings,
        'languages':post.preferences.languages,
        'physicalConditions':post.preferences.physicalConditions,
        'height': post.preferences.height
      },
      'role':post.role,
      'chargeRate': post.chargeRate
    };
    if(post.postCover){
      postDTO.postCover = post.postCover.id;
    }
    if(post.callIn && post.callInFrequency){
      postDTO.callInFrequency = post.callInFrequency;
    }

    return postDTO;

  }

  PostModel.formatPostDtoToJson = function(dtoPost){
    var post = dtoPost;
    post.hours = moment(moment(dtoPost.endTime, "HH:mm").toDate()).diff(moment(moment(dtoPost.startTime, "HH:mm").toDate()), 'hours');
    post.postSkills = checkListIfNull(dtoPost.skills);
    post.uniform = checkListIfNull(dtoPost.uniform);
    post.equipments = checkListIfNull(dtoPost.equipments);
    post.licenses = checkListIfNull(dtoPost.licenses);
    post.healthSafetyRequirements = checkListIfNull(dtoPost.healthSafetyRequirements);
    post.preferences.religions = checkListIfNull(dtoPost.preferences.religions);
    post.preferences.qualifications = checkListIfNull(dtoPost.preferences.qualifications);
    post.postCoverId = dtoPost.postCover;
    post.startTime = moment(dtoPost.startTime, "HH:mm").toDate();
    post.endTime = moment(dtoPost.endTime, "HH:mm").toDate();
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

  PostModel.prototype.refreshHealthSafetyRequirements = function(){
    PostService.getAllHealthSafetyRequirements().then(function (response) {
          PostModel.prototype.healthSafetyRequirementsChoices = response;
        }, function (error) {
          _this.errMessage = error;
        }
    );
  }

  PostModel.prototype.refreshQualifications = function(){
    PostService.getAllQualifications().then(function (response) {
          PostModel.prototype.qualificationChoices = response;
        }, function (error) {
          _this.errMessage = error;
        }
    );
  }

  PostModel.prototype.refreshReligions = function(){
    PostService.getAllReligions().then(function (response) {
          PostModel.prototype.religionChoices = response;
        }, function (error) {
          _this.errMessage = error;
        }
    );
  }

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

  PostModel.prototype.updateHours = function (post) {
    post.hours = moment(post.endTime).diff(moment(post.startTime), 'hours');
  };

  return PostModel;
}

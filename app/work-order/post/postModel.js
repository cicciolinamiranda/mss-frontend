module.exports = function (ngModule) {
  ngModule.factory('PostModel', PostModel);
};
var moment = require('moment');

function PostModel(PostService) {
  var _this = this;

  function PostModel() {
    this.callInFrequencyChoices = setCallInFrequencyChoices();
    this.post = setDefaultPost();
  }

  function setCallInFrequencyChoices() {
    var callInFrequencyChoices = [
      {id: 'EVERY_30_MIN', name: 'Every 30 mins'},
      {id: 'EVERY_1_HR', name: 'Every 1 hr'},
      {id: 'EVERY_2_HR', name: 'Every 2 hrs'}
    ];

  // multi-select list components
  _this.post.licenses = PostService.getAllLicenses().then(
      function (response) {
        return response.items;
      },
      function (error) {
        console.log(error);
      }
  );

  _this.post.skills = PostService.getAllPostSkills().then(
      function (response) {
        return response.items;
      },
      function (error) {
        console.log(error);
      }
  );

  _this.post.uniforms = PostService.getAllUniforms().then(
      function (response) {
        return response.items;
      },
      function (error) {
        console.log(error);
      }
  );

  _this.post.equipments = PostService.getAllEquipments().then(
      function (response) {
        return response.items;
      },
      function (error) {
        console.log(error);
      }
  );

  // service utility methods
  _this.post.addToArray = PostService.addToArray();
  _this.post.removeFromArray = PostService.removeFromArray();

  // selected list component
  _this.post.selectedLicense;
  _this.post.selectedSkill;
  _this.post.selectedUniform;
  _this.post.selectedEquipment;

  _this.callInFrequencyChoices = [
    {id: 'EVERY_30_MIN', name: 'Every 30 mins'},
    {id: 'EVERY_1_HR', name: 'Every 1 hr'},
    {id: 'EVERY_2_HR', name: 'Every 2 hrs'}
  ];
  _this.post.callInFrequency = _this.callInFrequencyChoices[0];

<<<<<<< Temporary merge branch 1
  _this.getPostInDtoFormat = function () {
    return {
=======
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

  _this.getPostInDtoFormat = function(){
    return{
>>>>>>> Temporary merge branch 2
      customerLocationId: _this.post.customerLocationId,
      name: _this.post.name,
      identificationRequired: _this.post.identificationRequired,
      numberOfEmployees: _this.post.numberOfEmployees,
      startTimeStr: moment(_this.post.startTime).format("HH:mm"),
      endTimeStr: moment(_this.post.endTime).format("HH:mm"),
      hours: _this.post.hours(),
      chargeRate: _this.post.chargeRate,
<<<<<<< Temporary merge branch 1
      isBookOn: _this.post.isBookOn,
      isBookOff: _this.post.isBookOff,
      isCallIn: _this.post.isCallIn,
      notes: _this.post.notes,
      licenses: _this.post.licenses,
      skills: _this.post.skills,
      uniforms: _this.post.uniforms,
      equipments: _this.post.equipments
=======
      bookOn: _this.post.bookOn,
      bookOff: _this.post.bookOff,
      callIn: _this.post.callIn,
      notes: _this.post.notes,
      preferences: _this.post.preferences
>>>>>>> Temporary merge branch 2
    }
  };

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

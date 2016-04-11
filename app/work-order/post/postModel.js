module.exports = function (ngModule) {
  ngModule.factory('PostModel', PostModel);
};
var moment = require('moment');

function PostModel(PostService) {
  var _this = this;

  _this.post = {};

  _this.post.customerLocationId = undefined;
  _this.post.name = '';
  _this.post.isIdentificationRequired = true;
  _this.post.numberOfEmployees = 1;
  _this.post.startTime = moment("09:00", "HH:mm").toDate();
  _this.post.endTime = moment("17:00", "HH:mm").toDate();
  _this.post.hours = moment(_this.post.endTime).diff(moment(_this.post.startTime), 'hours');
  _this.post.chargeRate = 0;
  _this.post.isBookOn = true;
  _this.post.isBookOff = true;
  _this.post.isCallIn = true;
  _this.post.notes = '';

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

  _this.getPostInDtoFormat = function () {
    return {
      customerLocationId: _this.post.customerLocationId,
      name: _this.post.name,
      isIdentificationRequired: _this.post.isIdentificationRequired,
      numberOfEmployees: _this.post.numberOfEmployees,
      startTimeStr: moment(_this.post.startTime).format("HH:mm"),
      endTimeStr: moment(_this.post.endTime).format("HH:mm"),
      hours: _this.post.hours,
      chargeRate: _this.post.chargeRate,
      isBookOn: _this.post.isBookOn,
      isBookOff: _this.post.isBookOff,
      isCallIn: _this.post.isCallIn,
      notes: _this.post.notes,
      licenses: _this.post.licenses,
      skills: _this.post.skills,
      uniforms: _this.post.uniforms,
      equipments: _this.post.equipments
    }
  };

  return _this;
}

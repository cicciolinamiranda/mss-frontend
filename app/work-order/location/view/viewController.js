module.exports = createCtrl;

/*@ngInject*/
function createCtrl() {
  var _this = this;

  //TODO: replace with what one from params
  var location = {
    id: "00120",
    latitude: "",
    longitude: "",
    address: "",
    startDate: "",
    endDate: "",
    siteContactDetails: [
      {
        name: "Katy Henning",
        phone: 3982732,
        email: "khenning@test.com"
      },
      {
        name: "Greggory Phase",
        phone: 3982732,
        email: "gphase@test.com"
      }
    ],
    protectiveEquipment: [
      {
        equipmentName: "Bulletproof Vest",
        id: 1,
        billed: true,
        costType: "ONE_OFF_COST"
      },
      {
        equipmentName: "Kevlar Vest",
        id: 3,
        billed: false
      }
    ],
    modeOfTransport: [
      {
        transportName: "Private Van",
        id: 1,
        billed: true,
        costType: "ONE_OFF_COST"
      },
      {
        transportName: "Battle Ship",
        id: 4,
        billed: false
      }
    ],
    barredEmployees: [
      {
        "id": "1054287114",
        "title": "Mr",
        "initials": "TS",
        "firstname": "Tre",
        "middlename": "Walsh",
        "surname": "Skiles",
        "dateOfBirth": "16/04/1990",
        "mobileNumber": "(689)116-9720",
        "landlineNumber": "(164)623-3263",
        "emergencyContactNumber": "692.026.8861",
        "emailAddress": "Tre.Skiles@g4s.com",
        "addressLine1": "35100 Hudson Squares Suite 571",
        "addressLine2": "8746 Dangelo Garden",
        "addressLine3": "7604 Jeffery Point Suite 223",
        "city": "Dietrichview",
        "state": "Utah",
        "country": "Hungary",
        "postCode": "08016-5577",
        "geoLocation": {
          "latitude": -29.354395,
          "longitude": -25.48529
        },
        "barsStartDate": "12/23/17"
      }
    ],
    siteSkills: [
      { "id": 1, "skillName": "Guarding"},
      { "id": 2, "skillName": "Self Defence"}
    ]
  };
  _this.mapSource;
  _this.coordinates;
  _this.duration;
  _this.cloc = location;
  _this.protectiveEquipList = [];
  _this.modeOfTransportList = [];
  _this.barredEmployeesList = [];

  function init() {

    _this.mapSource = "https://maps.googleapis.com/maps/api/staticmap?zoom=17&size=2000x200&markers="
      + _this.cloc.latitude + "," + _this.cloc.longitude;

    if(_this.cloc.latitude && _this.cloc.longitude){
      _this.coordinates = _this.cloc.latitude + " " + _this.cloc.longitude;
    }

    if(_this.cloc.startDate && _this.cloc.endDate){
      _this.duration = _this.cloc.startDate + " - " + _this.cloc.endDate;
    }

    if(_this.cloc.protectiveEquipment){
      for(i = 0; i < _this.cloc.protectiveEquipment.length; i++){
        var equip = {};
        equip.name = _this.cloc.protectiveEquipment[i].equipmentName;
        if(_this.cloc.protectiveEquipment[i].billed){
          //TODO: query costType value
          equip.costType = "[" + _this.cloc.protectiveEquipment[i].costType + "]";
        }
        _this.protectiveEquipList.push(equip);
      }
    }

    if(_this.cloc.modeOfTransport){
      for(i = 0; i < _this.cloc.modeOfTransport.length; i++){
        var mot = {};
        mot.name = _this.cloc.modeOfTransport[i].transportName;
        if(_this.cloc.modeOfTransport[i].billed){
          //TODO: query costType value
          mot.costType = "[" + _this.cloc.modeOfTransport[i].costType + "]";
        }
        _this.modeOfTransportList.push(mot);
      }
    }

    if(_this.cloc.barredEmployees){
      for(i = 0; i < _this.cloc.barredEmployees.length; i++){
        var emp = {};
        emp.name = _this.cloc.barredEmployees[i].surname +
          ", " + _this.cloc.barredEmployees[i].firstname +
          " " + _this.cloc.barredEmployees[i].middlename;
        emp.barsStartDate = _this.cloc.barredEmployees[i].barsStartDate;

        _this.barredEmployeesList.push(emp);
      }
    }
  }

  init();

}

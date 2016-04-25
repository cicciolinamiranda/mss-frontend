var component = require('./index');

describe("Auditlogs Service", function() {

  var AuditLogsService, $rootScope;
  var responseMock = [
    {
      "revisionNumber": "010110",
      "objectType": "CUSTOMER_LOCATION",
      "body": [{
        "fieldName": "name",
        "oldValue": [
          "Cicci Location"
        ],
        "newValue": [
          "Cicci Miranda Location"
        ]
      },
      {
        "fieldName": "sopDetails",
        "oldValue": [
          "https://docs.google.com/a/cloudsherpas.com/document/d/1oA_rV_QD_RpV3nQWgaWt9jnzQN1shM6_UgsRDo_-PTE/edit?usp=sharing"
        ],
        "newValue": [
          ""
        ]
      }],
      "ipAddress": "1.1.1.1",
      "createdDate": {
        "year": 2016,
        "dayOfMonth": 31,
        "dayOfWeek": 4,
        "era": 1,
        "dayOfYear": 91,
        "millisOfDay": 77113000,
        "monthOfYear": 3,
        "hourOfDay": 21,
        "minuteOfHour": 25,
        "secondOfMinute": 13,
        "millisOfSecond": 0,
        "weekyear": 2016,
        "weekOfWeekyear": 13,
        "yearOfEra": 2016,
        "yearOfCentury": 16,
        "centuryOfEra": 20,
        "secondOfDay": 77113,
        "minuteOfDay": 1285,
        "millis": "1459430713000",
        "zone": {
          "uncachedZone": {
            "cachable": true,
            "fixed": false,
            "id": "Asia/Manila"
          },
          "fixed": false,
          "id": "Asia/Manila"
        },
        "chronology": {
          "zone": {
            "uncachedZone": {
              "cachable": true,
              "fixed": false,
              "id": "Asia/Manila"
            },
            "fixed": false,
            "id": "Asia/Manila"
          }
        },
        "beforeNow": true,
        "afterNow": false,
        "equalNow": false
      },
      "createdBy": "Tester 0"
    }, {
      "revisionNumber": "010112",
      "objectType": "CUSTOMER_LOCATION",
      "body": [{
        "fieldName": "name",
        "oldValue": [
          "Test Location"
        ],
        "newValue": [
          "Test test Location"
        ]
      },
      {
        "fieldName": "locationInstructionsApproval",
        "oldValue": [
          ""
        ],
        "newValue": [
          "https://docs.google.com/a/cloudsherpas.com/document/d/1oA_rV_QD_RpV3nQWgaWt9jnzQN1shM6_UgsRDo_-PTE/edit?usp=sharing"
        ]
      }],
      "ipAddress": "1.2.2.1",
      "createdDate": {
        "year": 2016,
        "dayOfMonth": 4,
        "dayOfWeek": 4,
        "era": 1,
        "dayOfYear": 91,
        "millisOfDay": 77113000,
        "monthOfYear": 5,
        "hourOfDay": 21,
        "minuteOfHour": 25,
        "secondOfMinute": 13,
        "millisOfSecond": 0,
        "weekyear": 2016,
        "weekOfWeekyear": 13,
        "yearOfEra": 2016,
        "yearOfCentury": 16,
        "centuryOfEra": 20,
        "secondOfDay": 77113,
        "minuteOfDay": 1285,
        "millis": "1459430713000",
        "zone": {
          "uncachedZone": {
            "cachable": true,
            "fixed": false,
            "id": "Asia/Manila"
          },
          "fixed": false,
          "id": "Asia/Manila"
        },
        "chronology": {
          "zone": {
            "uncachedZone": {
              "cachable": true,
              "fixed": false,
              "id": "Asia/Manila"
            },
            "fixed": false,
            "id": "Asia/Manila"
          }
        },
        "beforeNow": true,
        "afterNow": false,
        "equalNow": false
      },
      "createdBy": "Tester 2"
    },
    {
      "revisionNumber": "010113",
      "objectType": "POST",
      "body": [{
        "fieldName": "name",
        "oldValue": [
          "Juan POST"
        ],
        "newValue": [
          "Juan Juan POST"
        ]
      }],
      "ipAddress": "1.3.2.2",
      "createdDate": {
        "year": 2016,
        "dayOfMonth": 4,
        "dayOfWeek": 4,
        "era": 1,
        "dayOfYear": 91,
        "millisOfDay": 77113000,
        "monthOfYear": 5,
        "hourOfDay": 21,
        "minuteOfHour": 25,
        "secondOfMinute": 13,
        "millisOfSecond": 0,
        "weekyear": 2016,
        "weekOfWeekyear": 13,
        "yearOfEra": 2016,
        "yearOfCentury": 16,
        "centuryOfEra": 20,
        "secondOfDay": 77113,
        "minuteOfDay": 1285,
        "millis": "1459430713000",
        "zone": {
          "uncachedZone": {
            "cachable": true,
            "fixed": false,
            "id": "Asia/Manila"
          },
          "fixed": false,
          "id": "Asia/Manila"
        },
        "chronology": {
          "zone": {
            "uncachedZone": {
              "cachable": true,
              "fixed": false,
              "id": "Asia/Manila"
            },
            "fixed": false,
            "id": "Asia/Manila"
          }
        },
        "beforeNow": true,
        "afterNow": false,
        "equalNow": false
      },
      "createdBy": "Tester 3"
    }
  ];
  var mockAuditLogsService = {
    getAuditLogs: function(){
        return $q.resolve({items: responseMock});
    }
  };



  beforeEach(angular.mock.module(component.name));

  // mock $gapi to inject to AuditLogsService
  beforeEach(function($httpBackend) {
    $httpBackend
      .when('GET', '/auditlogs')
      .respond(responseMock);
  });

});

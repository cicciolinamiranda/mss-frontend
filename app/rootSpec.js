var angular = require('angular');
var GAuth = require("./auth/authProvider");
require('angular-mocks/angular-mocks');

var testsContext = require.context(".", true, /Spec$/);
testsContext.keys().forEach(testsContext);

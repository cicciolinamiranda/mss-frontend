var angular = require('angular');
require('angular-mocks/angular-mocks');
require('./auth/authProvider');

var testsContext = require.context(".", true, /Spec$/);
testsContext.keys().forEach(testsContext);

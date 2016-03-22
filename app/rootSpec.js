var angular = require('angular');
require('angular-mocks/angular-mocks');

var testsContext = require.context(".", true, /Spec$/);
testsContext.keys().forEach(testsContext);

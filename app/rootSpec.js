var angular = require('angular');
require('angular-mocks/angular-mocks');

// require all modules ending in "_test" from the
// current directory and all subdirectories
var testsContext = require.context(".", true, /Spec$/);
testsContext.keys().forEach(testsContext);

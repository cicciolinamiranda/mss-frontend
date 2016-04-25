module.exports = function(ngModule) {
  ngModule.component('fileViewer', {
    template: require('./fileViewer.html'),
    controller: require('./fileViewerController'),
    bindings: {
      src: '='
    }
  });
};

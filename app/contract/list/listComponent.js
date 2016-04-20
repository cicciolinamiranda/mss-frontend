module.exports = function(ngModule) {
  ngModule.component('contractList', {
    template: require('./list.html'),
    controller: require('./listController')
  });
};

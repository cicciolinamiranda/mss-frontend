module.exports = function(ngModule) {
  ngModule.component('contactList', {
    template: require('./list.html'),
    controller: require('./listController')
  });
};

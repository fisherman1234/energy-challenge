require.config({
  paths: {
    'text': '../../components/requirejs-text/text'
  }
});

require([
  'text!./mainConfig.json'
], function (mainConfig) {
  require.config(JSON.parse(mainConfig));

  require([
    '../common'
  ], function (common) {
    require(['init']);
  });

});

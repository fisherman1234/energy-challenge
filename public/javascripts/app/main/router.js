define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/home',
  'views/home/breakdown',
  'views/home/history',
  'views/navigation/navigation'
], function ($, _, Backbone, HomeView, BreakDownView, HistoryView, NavigationView) {

  return Backbone.Router.extend({
    routes: {
      '': 'start',
      'breakdown': 'realTimeBreakdown',
      'history': 'history',
      '*catchAll': 'notFound'
    },
    initialize: function ($container) {
      this.$leftPane = $container.find('#left-pane-inner');
      this.$navBar = $container.find('#navigation');

      this.views = {
        home: { view: new HomeView(), rendered: false },
        breakdown: { view: new BreakDownView(), rendered: false },
        history: { view: new HistoryView(), rendered:false },
        navigation: { view: new NavigationView(), rendered: false}
      };


    },
    renderView: function ($pane, viewKey, options, forced) {

      $pane.find('#pane-contents').detach();
      if (!viewKey) {
        return;
      } // not adding a pane, just removing when no viewKey

      var viewConfig = this.views[viewKey];
      if (!viewConfig) {
        throw new Error("View not found " + viewKey);
      }

      if (_.isMobile()) {
        window.scrollTo(0, 1);
      }

      // render when necessary
      if (forced || !viewConfig.rendered) {
        var $container = $('<div id="pane-contents" class="paneContents-' + viewKey + '"></div>');
        viewConfig.view.setElement($container).render(options);
      }

      $pane.append(viewConfig.view.$el);
      viewConfig.rendered = true;
      this.views[viewKey] = viewConfig;
    },
    start: function(){
      this.renderView(this.$leftPane, 'home', {}, true);
      this.renderView(this.$navBar, 'navigation', {title: 'Home', hideBack: true}, true);

    },
    notFound: function(){
      this.start();
    },
    realTimeBreakdown: function(){
      this.renderView(this.$leftPane, 'breakdown', {}, true);
      this.renderView(this.$navBar, 'navigation', {title: 'Real Time'}, true);
    },
    history: function(){
      this.renderView(this.$leftPane, 'history', {}, true);
      this.renderView(this.$navBar, 'navigation', {title: 'History'}, true);

    }

  });

});

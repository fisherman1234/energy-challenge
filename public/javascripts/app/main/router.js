define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/home'
], function ($, _, Backbone, HomeView) {

  return Backbone.Router.extend({
    routes: {
      'start': 'start',
      '*catchAll': 'notFound'
    },
    initialize: function ($container) {
      this.$leftPane = $container.find('#left-pane-inner');
      this.$rightPane = $container.find('#right-pane-inner');
      this.$leftPaneOuter = $container.find('#left-pane');
      this.$rightPaneOuter = $container.find('#right-pane');
      this.$navBar = $container.find('#nav_bar');

      this.views = {
        home: { view: new HomeView(), rendered: false }
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
    },
    notFound: function(){
      console.log('not found');
    }

  });

});

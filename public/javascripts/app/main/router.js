define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/home',
  'views/login/login',
  'views/home/breakdown',
  'views/home/history',
  'views/navigation/navigation',
  'views/tutorials/tutorials',
  'views/goals/goals',
  'views/advice/advice'

], function ($, _, Backbone, HomeView, LoginView, BreakDownView, HistoryView, NavigationView, TutorialView, GoalView, AdviceView) {

  return Backbone.Router.extend({
    routes: {
      '': 'root',
      'home': 'home',
      'tutorial': 'tutorial',
      'breakdown': 'realTimeBreakdown',
      'history': 'history',
      'goals': 'goals',
      'advice': 'advice',
      '*catchAll': 'notFound'
    },
    initialize: function ($container) {
      this.$leftPane = $container.find('#left-pane-inner');
      this.$navBar = $container.find('#navigation');

      this.views = {
        home: { view: new HomeView(), rendered: false },
        breakdown: { view: new BreakDownView(), rendered: false },
        history: { view: new HistoryView(), rendered:false },
        navigation: { view: new NavigationView(), rendered: false},
        login: {view: new LoginView(), rendered: false},
        tutorial: {view: new TutorialView(), rendered: false},
        goals: {view: new GoalView(), rendered: false},
        advice: {view: new AdviceView(), rendered: false}
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

      window.scrollTo(0);

      // render when necessary
      if (forced || !viewConfig.rendered) {
        var $container = $('<div id="pane-contents" class="height-100 paneContents-' + viewKey + '"></div>');
        viewConfig.view.setElement($container).render(options);
      }

      $pane.append(viewConfig.view.$el);
      viewConfig.rendered = true;
      this.views[viewKey] = viewConfig;
    },
    home: function(){
      if (!localStorage.getItem("tutorialCompleted")) {
        return Backbone.history.navigate('/tutorial', true);
      }
      this.renderView(this.$leftPane, 'home');
      this.renderView(this.$navBar, 'navigation', {title: 'Home', hideBack: true}, true);
      Backbone.history.navigate('/');
      this.$navBar.show()


    },
    root: function(){
      if (this.isLoggedIn){
        this.home();
      } else {
        this.isLoggedIn = true;
        this.login();
      }
    },
    login: function () {
      this.renderView(this.$leftPane, 'login', {}, true);
      this.$navBar.hide()
    },
    tutorial: function(){
      this.renderView(this.$leftPane, 'tutorial', {}, true);
      this.$navBar.hide()
    },
    goals: function(){
      this.renderView(this.$leftPane, 'goals', {}, true);
      this.renderView(this.$navBar, 'navigation', {title: 'Goals'}, true);
    },
    notFound: function(){
      this.root();
    },
    advice: function(){
      this.renderView(this.$leftPane, 'advice', {}, true);
      this.renderView(this.$navBar, 'navigation', {title: 'Tips'}, true);
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

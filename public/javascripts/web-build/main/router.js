define(["jquery","underscore","backbone","views/home/home","views/login/login","views/home/breakdown","views/home/history","views/navigation/navigation","views/tutorials/tutorials"],function(e,t,n,r,i,s,o,u,a){return n.Router.extend({routes:{"":"root",home:"home",tutorial:"tutorial",breakdown:"realTimeBreakdown",history:"history","*catchAll":"notFound"},initialize:function(e){this.$leftPane=e.find("#left-pane-inner"),this.$navBar=e.find("#navigation"),this.views={home:{view:new r,rendered:!1},breakdown:{view:new s,rendered:!1},history:{view:new o,rendered:!1},navigation:{view:new u,rendered:!1},login:{view:new i,rendered:!1},tutorial:{view:new a,rendered:!1}}},renderView:function(n,r,i,s){n.find("#pane-contents").detach();if(!r)return;var o=this.views[r];if(!o)throw new Error("View not found "+r);t.isMobile()&&window.scrollTo(0,1);if(s||!o.rendered){var u=e('<div id="pane-contents" class="height-100 paneContents-'+r+'"></div>');o.view.setElement(u).render(i)}n.append(o.view.$el),o.rendered=!0,this.views[r]=o},home:function(){this.renderView(this.$leftPane,"home"),this.renderView(this.$navBar,"navigation",{title:"Home",hideBack:!0},!0),n.history.navigate("/"),this.$navBar.show()},root:function(){this.isLoggedIn?this.home():(this.isLoggedIn=!0,this.login())},login:function(){this.renderView(this.$leftPane,"login",{},!0),this.$navBar.hide()},tutorial:function(){this.renderView(this.$leftPane,"tutorial",{},!0),this.$navBar.hide()},notFound:function(){this.root()},realTimeBreakdown:function(){this.renderView(this.$leftPane,"breakdown",{},!0),this.renderView(this.$navBar,"navigation",{title:"Real Time"},!0)},history:function(){this.renderView(this.$leftPane,"history",{},!0),this.renderView(this.$navBar,"navigation",{title:"History"},!0)}})});
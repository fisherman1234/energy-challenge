define(["backbone","jquery","underscore","shared/views/base","text!./login.html"],function(e,t,n,r,i){return r.extend({initialize:function(e){},render:function(){return this.$el.html(i),this},events:{"click .login":"openHome"},openHome:function(){e.history.navigate("/home",!0)}})});
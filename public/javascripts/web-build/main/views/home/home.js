define(["backbone","jquery","underscore","shared/views/base","shared/collections/modelsCache","./../graphs/forecast","./realTime","./../graphs/currentGreenGauge","./../graphs/scores","text!./home.html"],function(e,t,n,r,i,s,o,u,a,f){return r.extend({initialize:function(e){this.forecast=new s,this.realTime=new o,this.currentGreenGauge=new u,this.scores=new a,i.home.on("sync",this.doRender,this)},events:{"click .section":"onSectionClicked"},render:function(){return this.$el.html(f),this.$(".loading").css("display","table"),this.$(".content").hide(),i.home.set({id:i.currentUser}),i.home.fetch(),this},doRender:function(){this.$(".loading").hide(),this.$(".content").show();var e={currentConsumption:i.home.get("real_time_consumption"),currentGreenProduction:i.home.get("real_time_prod")},t={c3p1:'<i class="icon-warning-sign"></i> CO2 hour !',c3p2:"You're on track :-) !",c3p3:"<i class='icon-certificate'></i> Good job ! You're earning a Green Hour point",c2p1:"<i class='icon-warning - sign'></i> CO2 hour !",c2p2:"You're on track :-) !",c2p3:"You're on track :-) !",c1p1:"All good !",c1p2:"Time to earn a Green Hour point !",c1p3:"Time to earn a Green Hour point !"},n=[i.home.get("scores")[0],i.home.get("scores")[1],i.home.get("scores")[2],i.home.get("scores")[3],i.home.get("scores")[4],i.home.get("scores")[5]],r="c"+e.currentConsumption.current+"p"+e.currentGreenProduction.current,s=i.home.get("scores")[0].stars/i.home.get("monthly_target").stars;this.$(".bar-green-hour").width(100*s);var o=i.home.get("scores")[0].flags/i.home.get("monthly_target").flags;this.$(".bar-gray-hour").width(100*o),this.$("#real-time-tip").html(t[r]),this.forecast.setElement(this.$("#forecast")).render(),this.realTime.setElement(this.$("#real-time")).render(e),this.scores.setElement(this.$("#scores")).render(n)},onSectionClicked:function(n){var r=t(n.currentTarget).attr("data-target");r&&e.history.navigate(r,!0)}})});
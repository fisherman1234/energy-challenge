define(["jquery","underscore","shared/views/base","collections/greenButtonConsumptions"],function(e,t,n,r){return n.extend({initialize:function(e){this.consumption=new r,this.consumption.on("sync",this.doRender,this)},render:function(e){return this.options=e,this.doRender(),this.$el.width(1e3),this.consumption.fetch(),this},doRender:function(){window.a=this.consumption;var n=this.consumption.models.map(function(e){return e.get("consumption")}),r=this.consumption.models.map(function(e){return e.get("fraction")}),i=t.min(n),s=t.max(n),o=(s-i)/4;this.consumption.each(function(e){var t=e.get("consumption");if(t<i+o)return e.set("consumption",1);if(t<i+3*o)return e.set("consumption",2);e.set("consumption",3)});var i=t.min(r),s=t.max(r),o=(s-i)/4;this.consumption.each(function(e){var t=e.get("fraction");if(t<i+o)return e.set("fraction",1);if(t<i+3*o)return e.set("fraction",2);e.set("fraction",3)});var u=e("<table/>"),a,f;this.consumption.each(function(t){var n=moment(t.get("date")).add("hours",7).dayOfYear();n!==a&&(a=n,f=e("<tr/>"),u.append(f));var r=e("<td/>"),i={1:"#ebf1df",2:"#c4d69e",3:"#779241",4:"#779241"};r.css("background-color",i[t.get("fraction")]);var s=5+(t.get("consumption")-1)*6;r.css("width","20px"),r.css("height","20px"),r.css("text-align","center"),r.html("o"),r.css("font-size",s+"px"),t.get("consumption")==3&&t.get("fraction")==1&&r.css("color","orange"),f.append(r)}),this.$el.append(u)}})});
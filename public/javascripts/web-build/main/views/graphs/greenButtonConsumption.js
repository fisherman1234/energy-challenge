define(["jquery","underscore","shared/views/base","collections/greenButtonConsumptions"],function(e,t,n,r){return n.extend({initialize:function(e){this.consumption=new r,this.consumption.on("sync",this.doRender,this)},render:function(e){return this.options=e,this.consumption.fetch(),this},doRender:function(){var t=e("<table/>");t.addClass("punchard");var n;$row=e("<tr/>");var r=0;for(var i=0;i<24;i++){var s=e("<th/>");s.html(i),$row.append(s)}t.append($row),this.consumption.each(function(i){var s=i.get("date");if(s!==n){n=s,$row=e("<tr/>");var o=e("<td class='rowhead' colspan='24'/>");o.html(moment().add("days",r).format("MMM, ddd DD")),$row.append(o),t.append($row),$row=e("<tr/>"),t.append($row),r-=1}var o=e("<td/>");if(r===-1&&i.get("hour")>=moment().hour())return $row.append(o);var u={1:"rgba(211, 220, 90, 0.2)",2:"rgba(180, 211, 79, 0.53)",3:"rgba(119, 146, 65, 0.7)"};o.css("background-color",u[i.get("fraction")]);var a=5+(i.get("consumption")-1)*6;o.html("&#9679;"),o.css("font-size",a+"px"),i.get("consumption")==3&&i.get("fraction")==1&&(o.html('<i class="icon-flag"/>'),o.addClass("gray-hour"),o.css("font-size","10px")),i.get("consumption")==3&&i.get("fraction")==3&&(o.html('<i class="icon-star"/>'),o.addClass("green-hour"),o.css("font-size","10px")),$row.append(o)}),this.$el.append(t)}})});
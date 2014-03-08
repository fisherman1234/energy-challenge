(function(e){var t=function(){var e="s",n=function(e){var t=-e.getTimezoneOffset();return t!==null?t:0},r=function(e,t,n){var r=new Date;return e!==undefined&&r.setFullYear(e),r.setMonth(t),r.setDate(n),r},i=function(e){return n(r(e,0,2))},s=function(e){return n(r(e,5,2))},o=function(e){var t=e.getMonth()>7,r=t?s(e.getFullYear()):i(e.getFullYear()),o=n(e),u=r<0,a=r-o;return!u&&!t?a<0:a!==0},u=function(){var t=i(),n=s(),r=t-n;return r<0?t+",1":r>0?n+",1,"+e:t+",0"},a=function(){var e=u();return new t.TimeZone(t.olson.timezones[e])},f=function(e){var t=new Date(2010,6,15,1,0,0,0),n={"America/Denver":new Date(2011,2,13,3,0,0,0),"America/Mazatlan":new Date(2011,3,3,3,0,0,0),"America/Chicago":new Date(2011,2,13,3,0,0,0),"America/Mexico_City":new Date(2011,3,3,3,0,0,0),"America/Asuncion":new Date(2012,9,7,3,0,0,0),"America/Santiago":new Date(2012,9,3,3,0,0,0),"America/Campo_Grande":new Date(2012,9,21,5,0,0,0),"America/Montevideo":new Date(2011,9,2,3,0,0,0),"America/Sao_Paulo":new Date(2011,9,16,5,0,0,0),"America/Los_Angeles":new Date(2011,2,13,8,0,0,0),"America/Santa_Isabel":new Date(2011,3,5,8,0,0,0),"America/Havana":new Date(2012,2,10,2,0,0,0),"America/New_York":new Date(2012,2,10,7,0,0,0),"Europe/Helsinki":new Date(2013,2,31,5,0,0,0),"Pacific/Auckland":new Date(2011,8,26,7,0,0,0),"America/Halifax":new Date(2011,2,13,6,0,0,0),"America/Goose_Bay":new Date(2011,2,13,2,1,0,0),"America/Miquelon":new Date(2011,2,13,5,0,0,0),"America/Godthab":new Date(2011,2,27,1,0,0,0),"Europe/Moscow":t,"Asia/Amman":new Date(2013,2,29,1,0,0,0),"Asia/Beirut":new Date(2013,2,31,2,0,0,0),"Asia/Damascus":new Date(2013,3,6,2,0,0,0),"Asia/Jerusalem":new Date(2013,2,29,5,0,0,0),"Asia/Yekaterinburg":t,"Asia/Omsk":t,"Asia/Krasnoyarsk":t,"Asia/Irkutsk":t,"Asia/Yakutsk":t,"Asia/Vladivostok":t,"Asia/Baku":new Date(2013,2,31,4,0,0),"Asia/Yerevan":new Date(2013,2,31,3,0,0),"Asia/Kamchatka":t,"Asia/Gaza":new Date(2010,2,27,4,0,0),"Africa/Cairo":new Date(2010,4,1,3,0,0),"Europe/Minsk":t,"Pacific/Apia":new Date(2010,10,1,1,0,0,0),"Pacific/Fiji":new Date(2010,11,1,0,0,0),"Australia/Perth":new Date(2008,10,1,1,0,0,0)};return n[e]};return{determine:a,date_is_dst:o,dst_start_for:f}}();t.TimeZone=function(e){var n={"America/Denver":["America/Denver","America/Mazatlan"],"America/Chicago":["America/Chicago","America/Mexico_City"],"America/Santiago":["America/Santiago","America/Asuncion","America/Campo_Grande"],"America/Montevideo":["America/Montevideo","America/Sao_Paulo"],"Asia/Beirut":["Asia/Amman","Asia/Jerusalem","Asia/Beirut","Europe/Helsinki","Asia/Damascus"],"Pacific/Auckland":["Pacific/Auckland","Pacific/Fiji"],"America/Los_Angeles":["America/Los_Angeles","America/Santa_Isabel"],"America/New_York":["America/Havana","America/New_York"],"America/Halifax":["America/Goose_Bay","America/Halifax"],"America/Godthab":["America/Miquelon","America/Godthab"],"Asia/Dubai":["Europe/Moscow"],"Asia/Dhaka":["Asia/Yekaterinburg"],"Asia/Jakarta":["Asia/Omsk"],"Asia/Shanghai":["Asia/Krasnoyarsk","Australia/Perth"],"Asia/Tokyo":["Asia/Irkutsk"],"Australia/Brisbane":["Asia/Yakutsk"],"Pacific/Noumea":["Asia/Vladivostok"],"Pacific/Tarawa":["Asia/Kamchatka","Pacific/Fiji"],"Pacific/Tongatapu":["Pacific/Apia"],"Asia/Baghdad":["Europe/Minsk"],"Asia/Baku":["Asia/Yerevan","Asia/Baku"],"Africa/Johannesburg":["Asia/Gaza","Africa/Cairo"]},r=e,i=function(){var e=n[r],i=e.length,s=0,o=e[0];for(;s<i;s+=1){o=e[s];if(t.date_is_dst(t.dst_start_for(o))){r=o;return}}},s=function(){return typeof n[r]!="undefined"};return s()&&i(),{name:function(){return r}}},t.olson={},t.olson.timezones={"-720,0":"Pacific/Majuro","-660,0":"Pacific/Pago_Pago","-600,1":"America/Adak","-600,0":"Pacific/Honolulu","-570,0":"Pacific/Marquesas","-540,0":"Pacific/Gambier","-540,1":"America/Anchorage","-480,1":"America/Los_Angeles","-480,0":"Pacific/Pitcairn","-420,0":"America/Phoenix","-420,1":"America/Denver","-360,0":"America/Guatemala","-360,1":"America/Chicago","-360,1,s":"Pacific/Easter","-300,0":"America/Bogota","-300,1":"America/New_York","-270,0":"America/Caracas","-240,1":"America/Halifax","-240,0":"America/Santo_Domingo","-240,1,s":"America/Santiago","-210,1":"America/St_Johns","-180,1":"America/Godthab","-180,0":"America/Argentina/Buenos_Aires","-180,1,s":"America/Montevideo","-120,0":"America/Noronha","-120,1":"America/Noronha","-60,1":"Atlantic/Azores","-60,0":"Atlantic/Cape_Verde","0,0":"Etc/UTC","0,1":"Europe/London","60,1":"Europe/Berlin","60,0":"Africa/Lagos","60,1,s":"Africa/Windhoek","120,1":"Asia/Beirut","120,0":"Africa/Johannesburg","180,0":"Asia/Baghdad","180,1":"Europe/Moscow","210,1":"Asia/Tehran","240,0":"Asia/Dubai","240,1":"Asia/Baku","270,0":"Asia/Kabul","300,1":"Asia/Yekaterinburg","300,0":"Asia/Karachi","330,0":"Asia/Kolkata","345,0":"Asia/Kathmandu","360,0":"Asia/Dhaka","360,1":"Asia/Omsk","390,0":"Asia/Rangoon","420,1":"Asia/Krasnoyarsk","420,0":"Asia/Jakarta","480,0":"Asia/Shanghai","480,1":"Asia/Irkutsk","525,0":"Australia/Eucla","525,1,s":"Australia/Eucla","540,1":"Asia/Yakutsk","540,0":"Asia/Tokyo","570,0":"Australia/Darwin","570,1,s":"Australia/Adelaide","600,0":"Australia/Brisbane","600,1":"Asia/Vladivostok","600,1,s":"Australia/Sydney","630,1,s":"Australia/Lord_Howe","660,1":"Asia/Kamchatka","660,0":"Pacific/Noumea","690,0":"Pacific/Norfolk","720,1,s":"Pacific/Auckland","720,0":"Pacific/Tarawa","765,1,s":"Pacific/Chatham","780,0":"Pacific/Tongatapu","780,1,s":"Pacific/Apia","840,0":"Pacific/Kiritimati"},typeof exports!="undefined"?exports.jstz=t:e.jstz=t})(this),define("jstime-zone",function(){}),define("shared/views/base",["backbone"],function(e){return e.View.extend({getQueryParams:function(){var e=window.location.search.substring(1).split("&"),t={};for(var n in e){if(e[n]==="")continue;var r=e[n].split("=");t[decodeURIComponent(r[0])]=decodeURIComponent(r[1])}return t},clean:function(){this.remove(),this.unbind()}})}),define("shared/models/home",["backbone"],function(e){return e.Model.extend({urlRoot:"/api/home"})}),define("shared/collections/modelsCache",["jquery","shared/models/home"],function(e,t){var n={home:new t,currentUser:"alan"};return n}),define("views/graphs/forecast",["jquery","underscore","shared/views/base"],function(e,t,n){return n.extend({initialize:function(e){},render:function(e){return this.options=e,this.colorMap={1:"#d3dc5a",2:"#b4d34f",3:"#779241"},this.doRender(),this},doRender:function(){this.$el.empty();var n=e("<table/>");n.addClass("forecast");var r=e("<tr/>"),i=e("<tr/>"),s=this;t.each(this.options,function(t){var n=e("<td/>");n.html(t.hour),r.append(n);var o=e("<td/>");o.css("background-color",s.colorMap[t.forecast]),i.append(o)}),n.append(r),n.append(i),this.$el.append(n)}})}),define("views/graphs/currentConsumption",["jquery","underscore","shared/views/base"],function(e,t,n){return n.extend({initialize:function(e){},render:function(e){return this.options=e,this.doRender(),this.$el.height(100),this.graphOptions={0:{color:"g",label:""},1:{color:"#FFCC00",label:"low"},2:{color:"#FFB300",label:"med."},3:{color:"#FF9900",label:"high"}},this},doRender:t.debounce(function(){var e=this;this.$el.dxLinearGauge({geometry:{orientation:"vertical"},rangeContainer:{ranges:[{startValue:0,endValue:1,color:"#FFCC00"},{startValue:1,endValue:2,color:"#FFB300"},{startValue:2,endValue:3,color:"#FF9900"}]},scale:{startValue:0,endValue:3,majorTick:{tickInterval:1},label:{customizeText:function(t){return e.graphOptions[t.valueText].label}}},value:e.options.current-.5,title:{text:"Your consumption",font:{size:12}}})},100)})}),define("views/graphs/currentGreenGauge",["jquery","underscore","shared/views/base"],function(e,t,n){return n.extend({initialize:function(e){},render:function(e){return this.options=e,this.doRender(),this.$el.height(100),this.graphOptions={0:{color:"g",label:""},1:{color:"#d3dc5a",label:"low"},2:{color:"#b4d34f",label:"med."},3:{color:"#779241",label:"high"}},this},doRender:t.debounce(function(){var e=this;this.$el.dxLinearGauge({geometry:{orientation:"vertical"},rangeContainer:{ranges:[{startValue:0,endValue:1,color:"#d3dc5a"},{startValue:1,endValue:2,color:"#b4d34f"},{startValue:2,endValue:3,color:"#779241"}]},scale:{startValue:0,endValue:3,majorTick:{tickInterval:1},label:{customizeText:function(t){return e.graphOptions[t.valueText].label}}},value:e.options.current-.5,title:{text:"Green production",font:{size:12}}})},100)})}),define("text!views/home/realTime.html",[],function(){return'<div class="row-fluid">\n  <div class="span6 mobile-span" id="current-consumption"></div>\n  <div class="span6 mobile-span" id="current-production"></div>\n</div>'}),define("views/home/realTime",["jquery","underscore","shared/views/base","./../graphs/currentConsumption","./../graphs/currentGreenGauge","text!./realTime.html"],function(e,t,n,r,i,s){return n.extend({initialize:function(e){this.currentConsumption=new r,this.currentProduction=new i},render:function(e){return this.options=e,this.$el.html(t.template(s,this.options.currentConsumptionOptions)),this.currentConsumption.setElement(this.$("#current-consumption")).render(this.options.currentConsumption),this.currentProduction.setElement(this.$("#current-production")).render(this.options.currentGreenProduction),this}})}),define("views/graphs/scores",["jquery","underscore","shared/views/base"],function(e,t,n){return n.extend({initialize:function(e){},render:function(e){return this.options=e,this.doRender(),this.$el.height(200),this},doRender:t.debounce(function(){var e={dataSource:this.options.data,commonSeriesSettings:{argumentField:"month",type:"bar"},series:[{valueField:"flags",name:"CO2 Hours",color:"#edbd00"},{valueField:"stars",name:"Green Hours",color:"#779241"}],legend:{verticalAlignment:"center",horizontalAlignment:"center"}},n=t.pluck(this.options.data,"flags"),r=t.pluck(this.options.data,"stars");if(this.options.goalsTarget){var i={valueAxis:{constantLines:this.options.goalsTarget}};e=t.extend(e,i),n.push(this.options.goalsTarget[0].value),r.push(this.options.goalsTarget[1].value+20)}e.valueAxis=e.valueAxis||{},e.valueAxis.min=t.min(n)-10,e.valueAxis.max=t.max(r)+10,this.chart=this.$el.dxChart(e)},100)})}),define("text!views/home/home.html",[],function(){return'<div class="loading">\n  <p class="loading-text">Loading ...</p>\n</div>\n<div class="content">\n  <div class="row-fluid section" data-target="/breakdown">\n    <div class="in-container">\n      <h4>Real Time</h4>\n\n      <div id="real-time"></div>\n    </div>\n    <p class="tip" id="real-time-tip"></p>\n  </div>\n\n  <div class="row-fluid section" data-target="/simulator">\n    <div class="in-container">\n\n      <h4>Green Hours Forecast</h4>\n\n      <div id="forecast" class="center"></div>\n    </div>\n  </div>\n\n\n  <div class="row-fluid section" data-target="/history">\n    <div class="in-container">\n      <h4>Goals\n        <small>March</small>\n      </h4>\n      <div class="row-fluid">\n        <p class="span3 mobile-span legend">Green Hours</p>\n\n        <div class="span9 mobile-span">\n          <div class="progress">\n            <div class="bar bar-green-hour" style="width: 0%;"></div>\n            <div class="current-date-marker" style="left:10%">Today</div>\n          </div>\n        </div>\n      </div>\n\n      <div class="row-fluid">\n        <p class="span3 mobile-span legend">CO2 Hours</p>\n\n        <div class="span9 mobile-span">\n          <div class="progress">\n            <div class="bar bar-gray-hour" style="width: 0%;"></div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n\n  <div class="row-fluid section" data-target="/advice">\n    <div class="in-container">\n      <h4>Advice</h4>\n\n      <p>Get more green hours !</p>\n\n    </div>\n  </div>\n\n\n  <div class="row-fluid section" data-target="/goals">\n    <div class="in-container">\n\n      <h4>Scores\n        <small>Past 6 months</small>\n      </h4>\n      <div id="scores"></div>\n    </div>\n  </div>\n</div>\n\n'}),define("views/home/home",["backbone","jquery","underscore","shared/views/base","shared/collections/modelsCache","./../graphs/forecast","./realTime","./../graphs/currentGreenGauge","./../graphs/scores","text!./home.html"],function(e,t,n,r,i,s,o,u,a,f){return r.extend({initialize:function(e){this.forecast=new s,this.realTime=new o,this.currentGreenGauge=new u,this.scores=new a,i.home.on("sync",this.doRender,this)},events:{"click .section":"onSectionClicked"},render:function(){return this.$el.html(f),this.$(".loading").css("display","table"),this.$(".content").hide(),i.home.set({id:i.currentUser}),i.home.fetch(),this},doRender:function(){this.$(".loading").hide(),this.$(".content").show();var e={currentConsumption:i.home.get("real_time_consumption"),currentGreenProduction:i.home.get("real_time_prod")},t={c3p1:'<i class="icon-warning-sign"></i> CO2 hour !',c3p2:"You're on track :-) !",c3p3:"<i class='icon-certificate'></i> Good job ! You're earning a Green Hour point",c2p1:"<i class='icon-warning - sign'></i> CO2 hour !",c2p2:"You're on track :-) !",c2p3:"You're on track :-) !",c1p1:"All good !",c1p2:"Time to earn a Green Hour point !",c1p3:"Time to earn a Green Hour point !"},n=[i.home.get("scores")[0],i.home.get("scores")[1],i.home.get("scores")[2],i.home.get("scores")[3],i.home.get("scores")[4],i.home.get("scores")[5]],r={data:n},s="c"+e.currentConsumption.current+"p"+e.currentGreenProduction.current,o=i.home.get("scores")[0].stars/i.home.get("monthly_target").stars;this.$(".bar-green-hour").css("width",Math.min(100*o,100)+"%");var u=i.home.get("scores")[0].flags/i.home.get("monthly_target").flags;this.$(".bar-gray-hour").css("width",Math.min(100*u,100)+"%"),this.$("#real-time-tip").html(t[s]),this.forecast.setElement(this.$("#forecast")).render(i.home.get("forecast")),this.realTime.setElement(this.$("#real-time")).render(e),this.scores.setElement(this.$("#scores")).render(r)},onSectionClicked:function(n){var r=t(n.currentTarget).attr("data-target");r&&e.history.navigate(r,!0)}})}),define("text!views/login/login.html",[],function(){return'<div class="welcome height-100">\n  <div class="welcome-inner">\n    <div class="welcome-content">\n      <h3>Greenity</h3>\n\n      <h4>It\'s green time !</h4>\n      <div class="btn btn-success login">Login</div>\n    </div>\n\n  </div>\n\n</div>'}),define("views/login/login",["backbone","jquery","underscore","shared/views/base","text!./login.html"],function(e,t,n,r,i){return r.extend({initialize:function(e){},render:function(){return this.$el.html(i),this},events:{"click .login":"openHome"},openHome:function(){e.history.navigate("/home",!0)}})}),define("views/graphs/realTimeBreakdown",["jquery","underscore","shared/views/base"],function(e,t,n){return n.extend({initialize:function(e){},render:function(e){return this.options=e,this.doRender(),this.$el.height(300),this.settings={Solar:{color:"#779241"},Wind:{color:"#d3dc5a"},"Other Renewable":{color:"#b4d34f"},"Non Renewable":{color:"#C9C6B6"}},this},doRender:t.debounce(function(){var e=this;this.$el.dxPieChart({legend:{verticalAlignment:"bottom",horizontalAlignment:"center"},dataSource:this.options,series:[{argumentField:"name",valueField:"value"}],title:"Real time production",customizePoint:function(t){return{color:e.settings[t.argument].color}},margin:{left:0}})},100)})}),define("text!views/home/breakdown.html",[],function(){return""}),define("views/home/breakdown",["jquery","underscore","shared/collections/modelsCache","shared/views/base","./../graphs/realTimeBreakdown","text!./breakdown.html"],function(e,t,n,r,i,s){return r.extend({initialize:function(e){this.breakdown=new i},render:function(){this.$el.html(s);var e=n.home.get("real_time_prod").details;return this.breakdown.setElement(this.$el).render(e),this}})}),define("models/greenButtonConsumption",["backbone"],function(e){return e.Model.extend({urlRoot:"/api/green_button"})}),define("collections/greenButtonConsumptions",["underscore","backbone","models/greenButtonConsumption"],function(e,t,n){var r=t.Collection.extend({model:n,url:"/api/green_button"});return r}),define("views/graphs/greenButtonConsumption",["jquery","underscore","shared/collections/modelsCache","shared/views/base","collections/greenButtonConsumptions"],function(e,t,n,r,i){return r.extend({initialize:function(e){this.consumption=new i,this.consumption.on("sync",this.doRender,this)},render:function(e){return this.options=e||{},this.options.data=this.options.data||{last_day:moment().dayOfYear(),duration:6},this.options.data.user_id=n.currentUser,this.consumption.fetch({data:this.options.data}),this},doRender:function(){var t=e("<table/>");t.addClass("punchard");var n;$row=e("<tr/>");var r=0;for(var i=0;i<24;i++){var s=e("<th/>");s.html(i),$row.append(s)}t.append($row);var o=this;this.scores={stars:[],flags:[]},this.consumption.each(function(i){var s=i.get("date");if(moment(s).dayOfYear()>moment().dayOfYear())return;if(s!==n){if(r<-6)return;n=s,$row=e("<tr/>");var u=e("<td class='rowhead' colspan='24'/>");u.html(moment().add("days",r).format("MMM, ddd DD")),$row.append(u),t.append($row),$row=e("<tr/>"),t.append($row),r-=1}var u=e("<td/>");if(moment(s).dayOfYear()===moment().dayOfYear()&&i.get("hour")>=moment().hour())return $row.append(u);var a={1:"rgba(211, 220, 90, 0.2)",2:"rgba(180, 211, 79, 0.53)",3:"rgba(119, 146, 65, 0.7)"};u.css("background-color",a[i.get("fraction")]);var f=5+(i.get("consumption")-1)*6;u.css("font-size",f+"px"),i.get("consumption")==3&&i.get("fraction")==1&&(u.html('<i class="icon-flag"/>'),u.addClass("gray-hour"),u.css("font-size","10px"),o.scores.flags.push(i)),i.get("consumption")==3&&(i.get("fraction")==3||i.get("fraction")==2)&&(u.html('<i class="icon-star"/>'),u.addClass("green-hour"),u.css("font-size","10px"),o.scores.stars.push(i)),$row.append(u)}),this.$el.append(t),this.trigger("rendered")}})}),define("text!views/home/history.html",[],function(){return'<div class="history-container">\n  <h5>Convert your flags into stars !</h5>\n\n  <p>Here is how you did on the last 7 days.</p>\n\n  <div id="full-history"></div>\n\n  <div class="legend-container">\n    <table class="legend">\n      <tr>\n        <td class="item" style="background-color: rgba(211, 220, 90, 0.2)"></td>\n        <td class="value"><b>CO2 Hour</b> Limited production of green energy</td>\n      </tr>\n      <tr>\n        <td class="item" style="background-color: rgba(180, 211, 79, 0.53)"></td>\n        <td class="value">Regular production of green energy</td>\n      </tr>\n      <tr>\n        <td class="item" style="background-color: rgba(119, 146, 65, 0.7)"></td>\n        <td class="value"><b>Green hour</b> A lot of energy on the grid is produced by renewable sources!</td>\n      </tr>\n      <tr>\n        <td class="item"><i class="icon-star-empty"></i></td>\n        <td class="value">Good job :-) ! You\'ve used your energy-hungry equipments during a green peak</td>\n      </tr>\n      <tr>\n        <td class="item"><i class="icon-flag"></i></td>\n        <td class="value">Careful, you\'ve used a lot of energy during a CO2 Hour</td>\n      </tr>\n    </table>\n  </div>\n\n</div>\n\n<div class="row-fluid section" id="goal-data" data-target="/goals">\n\n</div>\n'}),define("text!views/home/goalData.html",[],function(){return'<div class="in-container">\n  <h4>My goals</h4>\n\n  <p>So far this month:</p>\n\n  <p><i class="icon-star-empty"></i> Green Hours <%= stars %>/<%= starsTotal %></p>\n\n  <p><i class="icon-flag"></i> CO2 Hours <%= flags %>/<%= flagsTotal %></p>\n\n</div>'}),define("views/home/history",["backbone","jquery","underscore","shared/collections/modelsCache","shared/views/base","./../graphs/greenButtonConsumption","text!./history.html","text!./goalData.html"],function(e,t,n,r,i,s,o,u){return i.extend({initialize:function(e){this.consumption=new s,this.consumption.on("rendered",this.postRender,this)},events:{"click .section":"onSectionClicked"},render:function(){this.$el.html(o),this.$(".legend").hide();var e={};return e.data={last_day:moment().dayOfYear(),duration:6},this.consumption.setElement(this.$("#full-history")).render(e),this},postRender:function(){this.$(".legend").show();var e={stars:this.consumption.scores.stars.length,starsTotal:r.home.get("monthly_target").stars,flags:this.consumption.scores.flags.length,flagsTotal:-r.home.get("monthly_target").flags};this.$("#goal-data").html(n.template(u,e))},onSectionClicked:function(n){var r=t(n.currentTarget).attr("data-target");r&&e.history.navigate(r,!0)}})}),define("text!views/navigation/navigation.html",[],function(){return'<span class="previous-page">\n      <i class="icon-chevron-left"></i> Back\n    </span>\n<span class="title"><%= title %></span>\n'}),define("views/navigation/navigation",["backbone","jquery","underscore","shared/views/base","text!./navigation.html"],function(e,t,n,r,i){return r.extend({initialize:function(e){},render:function(e){return this.$el.html(n.template(i,e)),e.hideBack&&this.$(".previous-page").hide(),this},events:{"click .previous-page":"onPreviousPageClick"},onPreviousPageClick:function(){window.history.back()}})}),define("text!views/tutorials/page1.html",[],function(){return'<h3>How green are you?</h3>\n\n<p>Power production means are varying through the day, as consumption, and weather, change.</p>\n\n<img width=\'200\' src="/images/tutorial-1.png"/>\n\n<p>Some hours are <strong class="green">greener</strong> than others thanks to strong wind and solar energy<br>\n  <span class="green">- Those are Green Hours</span>\n\n<p>Some other require more coal and gas power-plant, generating a lot more of <strong class="orange">CO2</strong><br>\n  <span class="orange">- Those are CO2 Hours</span>\n  \0</p>'}),define("text!views/tutorials/page2.html",[],function(){return'<h3>When do you have the greenest consumption?</h3>\n<p>Greenity has developed an easy monitoring tool to watch your consumption habits, per hour and per day.</p>\n<img width=\'240\' src="/images/tutorial-2.png"/>\n\n<h4 class="green">The greener, the better.</h4>\n\n    <p>Each <i class="green icon-star"></i> is an hour when your consumption was in line with the highest renewable production rates.</p>\n<p>A <i class="icon-flag orange"></i> is an hour when your consumption was high despite a low renewable production.</p>'}),define("text!views/tutorials/page3.html",[],function(){return'<h3> Can you go greener? </h3>\n\n    <h4>Yes!</h4>\n<p>We are providing you with real-time information to compare your level of <span class="orange">consumption</span> to the level of <span class="green">renewable production</span>.</p>\n\n<img width=\'240\' src="/images/tutorial-3.1.png"/>\n\n<p>Try to align them to be as green as possible.</p>\n\n<p>We also forecast for you the next greenest hours so you can be prepared.</p>\n<img width=\'140\' src="/images/tutorial-3.2.png"/>\n\n'}),define("text!views/tutorials/page4.html",[],function(){return"<h4>Now</h4>\n\n<h3>Improve yourself!</h3>\n\n    <p>Review your goals for the months…</p>\n\0\n<img width='240' src=\"/images/tutorial-4.1.png\"/>\n\n    <p>… and go greener month after month!</p>\n\n<img width='240' src=\"/images/tutorial-4.2.png\"/>\n\n"}),define("text!views/tutorials/page5.html",[],function(){return'<div class="start">\n  <h3>Ready :-) ?</h3>\n  <button class="btn btn-success">Start</button>\n</div>'}),define("text!views/tutorials/tutorials.html",[],function(){return'<div id="myCarousel" class="carousel slide height-100" data-interval="false">\n  <!-- Carousel items -->\n  <div class="carousel-inner">\n    <div id="page1" class="active item"></div>\n    <div id="page2" class="item"></div>\n    <div id="page3" class="item"></div>\n    <div id="page4" class="item"></div>\n    <div id="page5" class="item"></div>\n  </div>\n  <!-- Carousel nav -->\n  <a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>\n  <a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>\n</div>'}),define("views/tutorials/tutorials",["backbone","jquery","underscore","shared/views/base","text!./page1.html","text!./page2.html","text!./page3.html","text!./page4.html","text!./page5.html","text!./tutorials.html"],function(e,t,n,r,i,s,o,u,a,f){return r.extend({initialize:function(e){},render:function(){return this.$el.html(f),this.slidCount=0,this.$("#page1").html(i),this.$("#page2").html(s),this.$("#page3").html(o),this.$("#page4").html(u),this.$("#page5").html(a),this},events:{"click .btn":"openApp",slid:"onSlid"},openApp:function(){localStorage.setItem("tutorialCompleted",!0),e.history.navigate("/",!0)},onSlid:function(e){this.slidCount+=1,this.slidCount==4&&this.$(".carousel-control").hide()}})}),define("text!views/goals/goals.html",[],function(){return'<div id="score-history"></div>\n\n<div class="row-fluid">\n  <p>\n    <i class="icon-flag"></i> CO2 Hours :<span class="flag-display"></span><br>\n    <input class="goal-range" id="flag-value" type="range" min=0 max=100/>\n  </p>\n\n  <p>\n    <i class="icon-star"></i> Green hours :<span class="star-display"></span><br>\n    <input class="goal-range" id="star-value" type="range" min=0 max=120/> <br>\n  </p>\n\n  <p>\n    <span class="btn pull-right" id="save">Save</span>\n  </p>\n\n</div>'}),define("views/goals/goals",["jquery","backbone","underscore","shared/views/base","shared/collections/modelsCache","./../graphs/scores","text!./goals.html"],function(e,t,n,r,i,s,o){return r.extend({initialize:function(e){this.scores=new s},render:function(){this.$el.html(o);var e=[i.home.get("scores")[1],i.home.get("scores")[2],i.home.get("scores")[3],i.home.get("scores")[4],i.home.get("scores")[5],i.home.get("scores")[6]],t=[{width:1,value:i.home.get("monthly_target").flags,color:"#edbd00",dashStyle:"dash"},{width:1,value:i.home.get("monthly_target").stars,color:"#779241",dashStyle:"dash"}];return this.graphOpt={data:e,goalsTarget:t},this.scores.setElement(this.$("#score-history")).render(this.graphOpt),window.a=this.scores,this.$(".flag-display").html(-i.home.get("monthly_target").flags),this.$(".star-display").html(i.home.get("monthly_target").stars),this.$("#flag-value").val(-i.home.get("monthly_target").flags),this.$("#star-value").val(i.home.get("monthly_target").stars),this},events:{"change #flag-value":"onFlagValueChanged","change #star-value":"onStarValueChanged","click #save":"onSave"},onFlagValueChanged:function(t){var n=e(t.currentTarget).val();n=parseInt(n,10),this.graphOpt.goalsTarget[0].value=-n,this.scores.render(this.graphOpt),this.$(".flag-display").html(n)},onStarValueChanged:function(t){var n=e(t.currentTarget).val();n=parseInt(n,10),this.graphOpt.goalsTarget[1].value=n,this.scores.render(this.graphOpt),this.$(".star-display").html(n)},onSave:function(){i.home.set("monthly_target",{flags:-parseInt(this.$("#flag-value").val(),10),stars:parseInt(this.$("#star-value").val())}).save(),t.history.navigate("/",!0)}})}),define("text!views/advice/advice.html",[],function(){return'<div id="myCarousel" class="carousel slide height-100" data-interval="false">\n  <!-- Carousel items -->\n  <div class="carousel-inner">\n    <div id="page1" class="active item"></div>\n    <div id="page2" class="item"></div>\n    <div id="page3" class="item"></div>\n    <div id="page4" class="item"></div>\n    <div id="page5" class="item"></div>\n    <div id="page6" class="item"></div>\n  </div>\n  <!-- Carousel nav -->\n  <a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>\n  <a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>\n</div>'}),define("text!views/advice/tip1.html",[],function(){return'<h3>Turn off your thermostat when you are not home</h3>\n<p>+-1F on your thermostat eqauls to 1% of your energy consumption</p>\n<img class="glyph-img" src="/images/advice-1.png">'}),define("text!views/advice/tip2.html",[],function(){return'<h3>Unplug appliances when not in use</h3>\n<p>Vampire power costs $3B a year to US citizens..</p>\n<img class="glyph-img" src="/images/advice-2.png">'}),define("text!views/advice/tip3.html",[],function(){return'<h3>Turn off your lights</h3>\n<p>You could reduce by 30% your lighting consumption during 3 hours</p>\n<img class="glyph-img" src="/images/advice-3.png">'}),define("text!views/advice/tip4.html",[],function(){return'<h3>Switch off the outdoor lighting</h3>\n<p>Do you need to keep your outdoor lighting running for 8 hours every night?</p>\n<img class="glyph-img" src="/images/advice-3.png">'}),define("text!views/advice/tip5.html",[],function(){return'<h3>Take a shower instead of a bath</h3>\n<p>This could save 1kWh!</p>\n<img class="glyph-img" src="/images/advice-5.png">'}),define("text!views/advice/tip6.html",[],function(){return'<h3>Turn off yor water heater when you are not home</h3>\n\n<img class="glyph-img" src="/images/advice-6.png">'}),define("views/advice/advice",["jquery","underscore","shared/views/base","text!./advice.html","text!./tip1.html","text!./tip2.html","text!./tip3.html","text!./tip4.html","text!./tip5.html","text!./tip6.html"],function(e,t,n,r,i,s,o,u,a,f){return n.extend({initialize:function(e){},render:function(){return this.$el.html(r),this.$("#page1").html(i),this.$("#page2").html(s),this.$("#page3").html(o),this.$("#page4").html(u),this.$("#page5").html(a),this.$("#page6").html(f),this}})}),define("text!views/home/simulator.html",[],function(){return'<div class="gauge">\n\n</div>\n<div class="controls">\n\n</div>'}),define("views/home/simulator",["backbone","jquery","underscore","shared/views/base","text!./simulator.html"],function(e,t,n,r,i){return r.extend({initialize:function(e){this.database=[{key:"Aquarium",value:500},{key:"Coffee maker",value:200},{key:"Clothes washer",value:500},{key:"Clothes dryer",value:2500},{key:"Dishwasher",value:1250},{key:"Hair dryer",value:150},{key:"Microwave oven",value:200},{key:"Toaster",value:300},{key:"Vacuum cleaner",value:240}],this.base=500,this.max=3e3},render:function(){return this.$el.html(i),this.createTable(),this.renderGauge(),this},events:{"click td":"onCellClicked"},createTable:function(){var e=t("<table/>"),r=t("<tr/>");e.append(r);var i=0;n.each(this.database,function(n){i>=3&&(r=t("<tr/>"),e.append(r),i=0),$cell=t("<td/>"),$cell.html(n.key),$cell.attr("data-value",n.value),r.append($cell),i+=1}),this.$(".controls").append(e)},onCellClicked:function(e){t(e.currentTarget).toggleClass("active"),this.renderGauge()},renderGauge:n.debounce(function(){var e=500;n.map(this.$(".active"),function(n){e+=parseInt(t(n).attr("data-value"),10)}),this.graphOptions={0:{color:"g",label:""},1e3:{color:"#FFCC00",label:"low"},2e3:{color:"#FFB300",label:"med."},3e3:{color:"#FF9900",label:"high"}};var r=this;this.gauge?this.gauge.value(e):this.gauge=this.$(".gauge").dxLinearGauge({rangeContainer:{ranges:[{startValue:0,endValue:1e3,color:"#FFCC00"},{startValue:1e3,endValue:2e3,color:"#FFB300"},{startValue:2e3,endValue:3e3,color:"#FF9900"}]},scale:{startValue:0,endValue:3e3,majorTick:{tickInterval:1e3},label:{customizeText:function(e){return r.graphOptions[e.valueText].label}}},value:e,title:{text:"Estimated consumption",font:{size:12}}}).dxLinearGauge("instance")},100)})}),define("router",["jquery","underscore","backbone","views/home/home","views/login/login","views/home/breakdown","views/home/history","views/navigation/navigation","views/tutorials/tutorials","views/goals/goals","views/advice/advice","views/home/simulator"],function(e,t,n,r,i,s,o,u,a,f,l,c){return n.Router.extend({routes:{"":"root",home:"home",tutorial:"tutorial",breakdown:"realTimeBreakdown",history:"history",goals:"goals",advice:"advice",simulator:"simulator","*catchAll":"notFound"},initialize:function(e){this.$leftPane=e.find("#left-pane-inner"),this.$navBar=e.find("#navigation"),this.views={home:{view:new r,rendered:!1},breakdown:{view:new s,rendered:!1},history:{view:new o,rendered:!1},navigation:{view:new u,rendered:!1},login:{view:new i,rendered:!1},tutorial:{view:new a,rendered:!1},goals:{view:new f,rendered:!1},advice:{view:new l,rendered:!1},simulator:{view:new c,rendered:!1}}},renderView:function(t,n,r,i){t.find("#pane-contents").detach();if(!n)return;var s=this.views[n];if(!s)throw new Error("View not found "+n);window.scrollTo(0);if(i||!s.rendered){var o=e('<div id="pane-contents" class="height-100 paneContents-'+n+'"></div>');s.view.setElement(o).render(r)}t.append(s.view.$el),s.rendered=!0,this.views[n]=s},home:function(){if(!localStorage.getItem("tutorialCompleted"))return n.history.navigate("/tutorial",!0);this.renderView(this.$leftPane,"home"),this.renderView(this.$navBar,"navigation",{title:"Home",hideBack:!0},!0),n.history.navigate("/"),this.$navBar.show()},root:function(){this.isLoggedIn?this.home():(this.isLoggedIn=!0,this.login())},login:function(){this.renderView(this.$leftPane,"login",{},!0),this.$navBar.hide()},tutorial:function(){this.renderView(this.$leftPane,"tutorial",{},!0),this.$navBar.hide()},goals:function(){this.renderView(this.$leftPane,"goals",{},!0),this.renderView(this.$navBar,"navigation",{title:"Goals"},!0)},notFound:function(){this.root()},advice:function(){this.renderView(this.$leftPane,"advice",{},!0),this.renderView(this.$navBar,"navigation",{title:"Tips"},!0)},simulator:function(){this.renderView(this.$leftPane,"simulator",{},!0),this.renderView(this.$navBar,"navigation",{title:"Energy estimate"},!0)},realTimeBreakdown:function(){this.renderView(this.$leftPane,"breakdown",{},!0),this.renderView(this.$navBar,"navigation",{title:"Real Time"},!0)},history:function(){this.renderView(this.$leftPane,"history",{},!0),this.renderView(this.$navBar,"navigation",{title:"History"},!0)}})}),define("text!layout.html",[],function(){return'<div id="nav_bar"></div>\n<div id="body" class="height-100 container body">\n  <section id="navigation"></section>\n\n  <div class="row containerRow height-100">\n    <section id="left-pane" class="span8 scrollable height-100">\n      <div id="left-pane-inner" class="height-100"></div>\n    </section>\n    <section id="right-pane" class="span4">\n      <div id="right-pane-inner" class="scrollable"></div>\n    </section>\n\n  </div>\n</div>'}),define("layout",["jquery","underscore","shared/views/base","text!./layout.html"],function(e,t,n,r){var i=n.extend({el:"body",initialize:function(){},events:{"touchmove .scrollable":"onScrollableTouch"},render:function(){return this.$el.html(r),this},onScrollableTouch:function(e){e.stopPropagation()}});return i}),define("init",["underscore","jquery","backbone","jstime-zone","./router","shared/collections/modelsCache","./layout"],function(e,t,n,r,i,s,o){var u=t("body");(new o).render();var a=new i(u);window.modelsCache=s,window.BrowserTZone=window.BrowserTZone||{},BrowserTZone.setCookie=t.cookie("browser.timezone",jstz.determine().name(),{expires:365,path:"/"}),n.history.start({pushState:!0})});
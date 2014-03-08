define("shared/views/base",["backbone"],function(e){return e.View.extend({getQueryParams:function(){var e=window.location.search.substring(1).split("&"),t={};for(var n in e){if(e[n]==="")continue;var r=e[n].split("=");t[decodeURIComponent(r[0])]=decodeURIComponent(r[1])}return t},clean:function(){this.remove(),this.unbind()}})}),define("shared/models/home",["backbone"],function(e){return e.Model.extend({urlRoot:"/api/home"})}),define("shared/collections/modelsCache",["jquery","shared/models/home"],function(e,t){var n={home:new t,currentUser:"alan"};return n}),define("views/graphs/forecast",["jquery","underscore","shared/views/base"],function(e,t,n){return n.extend({initialize:function(e){},render:function(e){return this.options=e,this.options=[{hour:6,forecast:1},{hour:7,forecast:2},{hour:8,forecast:3},{hour:9,forecast:1},{hour:10,forecast:2},{hour:11,forecast:1},{hour:12,forecast:3}],this.colorMap={1:"#d3dc5a",2:"#b4d34f",3:"#779241"},this.doRender(),this},doRender:function(){this.$el.empty();var n=e("<table/>");n.addClass("forecast");var r=e("<tr/>"),i=e("<tr/>"),s=this;t.each(this.options,function(t){var n=e("<td/>");n.html(t.hour),r.append(n);var o=e("<td/>");o.css("background-color",s.colorMap[t.forecast]),i.append(o)}),n.append(r),n.append(i),this.$el.append(n)}})}),define("views/graphs/currentConsumption",["jquery","underscore","shared/views/base"],function(e,t,n){return n.extend({initialize:function(e){},render:function(e){return this.options=e,this.doRender(),this.$el.height(100),this.graphOptions={0:{color:"g",label:""},1:{color:"#FFCC00",label:"low"},2:{color:"#FFB300",label:"med."},3:{color:"#FF9900",label:"high"}},this},doRender:t.debounce(function(){var e=this;this.$el.dxLinearGauge({geometry:{orientation:"vertical"},rangeContainer:{ranges:[{startValue:0,endValue:1,color:"#FFCC00"},{startValue:1,endValue:2,color:"#FFB300"},{startValue:2,endValue:3,color:"#FF9900"}]},scale:{startValue:0,endValue:3,majorTick:{tickInterval:1},label:{customizeText:function(t){return e.graphOptions[t.valueText].label}}},value:e.options.current-.5,title:{text:"Your consumption",font:{size:12}}})},100)})}),define("views/graphs/currentGreenGauge",["jquery","underscore","shared/views/base"],function(e,t,n){return n.extend({initialize:function(e){},render:function(e){return this.options=e,this.doRender(),this.$el.height(100),this.graphOptions={0:{color:"g",label:""},1:{color:"#d3dc5a",label:"low"},2:{color:"#b4d34f",label:"med."},3:{color:"#779241",label:"high"}},this},doRender:t.debounce(function(){var e=this;this.$el.dxLinearGauge({geometry:{orientation:"vertical"},rangeContainer:{ranges:[{startValue:0,endValue:1,color:"#d3dc5a"},{startValue:1,endValue:2,color:"#b4d34f"},{startValue:2,endValue:3,color:"#779241"}]},scale:{startValue:0,endValue:3,majorTick:{tickInterval:1},label:{customizeText:function(t){return e.graphOptions[t.valueText].label}}},value:e.options.current-.5,title:{text:"Green production",font:{size:12}}})},100)})}),define("text!views/home/realTime.html",[],function(){return'<div class="row-fluid">\n  <div class="span6 mobile-span" id="current-consumption"></div>\n  <div class="span6 mobile-span" id="current-production"></div>\n</div>'}),define("views/home/realTime",["jquery","underscore","shared/views/base","./../graphs/currentConsumption","./../graphs/currentGreenGauge","text!./realTime.html"],function(e,t,n,r,i,s){return n.extend({initialize:function(e){this.currentConsumption=new r,this.currentProduction=new i},render:function(e){return this.options=e,this.$el.html(t.template(s,this.options.currentConsumptionOptions)),this.currentConsumption.setElement(this.$("#current-consumption")).render(this.options.currentConsumption),this.currentProduction.setElement(this.$("#current-production")).render(this.options.currentGreenProduction),this}})}),define("views/graphs/scores",["jquery","underscore","shared/views/base"],function(e,t,n){return n.extend({initialize:function(e){},render:function(e){return this.options=e,this.doRender(),this.$el.height(200),this},doRender:t.debounce(function(){this.$el.dxChart({dataSource:this.options,commonSeriesSettings:{argumentField:"month",type:"bar"},series:[{valueField:"flags",name:"CO2 Hours",color:"#edbd00"},{valueField:"stars",name:"Green Hours",color:"#779241"}],legend:{verticalAlignment:"center",horizontalAlignment:"center"}})},100)})}),define("text!views/home/home.html",[],function(){return'<div class="loading">\n  <p class="loading-text">Loading ...</p>\n</div>\n<div class="content">\n  <div class="row-fluid section" data-target="/breakdown">\n    <div class="in-container">\n      <h4>Real Time</h4>\n\n      <div id="real-time"></div>\n    </div>\n    <p class="tip" id="real-time-tip"></p>\n  </div>\n\n  <div class="row-fluid section">\n    <div class="in-container">\n\n      <h4>Green Hours Forecast</h4>\n\n      <div id="forecast" class="center"></div>\n    </div>\n  </div>\n\n\n  <div class="row-fluid section" data-target="/history">\n    <div class="in-container">\n      <h4>Goals\n        <small>March</small>\n      </h4>\n      <div class="row-fluid">\n        <p class="span3 mobile-span legend">Green Hours</p>\n\n        <div class="span9 mobile-span">\n          <div class="progress">\n            <div class="bar bar-green-hour" style="width: 0%;"></div>\n            <div class="current-date-marker" style="left:10%">Today</div>\n          </div>\n        </div>\n      </div>\n\n      <div class="row-fluid">\n        <p class="span3 mobile-span legend">CO2 Hours</p>\n\n        <div class="span9 mobile-span">\n          <div class="progress">\n            <div class="bar bar-gray-hour" style="width: 0%;"></div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n\n  <div class="row-fluid section">\n    <div class="in-container">\n      <h4>Advice</h4>\n\n      <p>Get more green hours </p>\n\n    </div>\n  </div>\n\n\n  <div class="row-fluid section">\n    <div class="in-container">\n\n      <h4>Scores\n        <small>Past 6 months</small>\n      </h4>\n      <div id="scores"></div>\n    </div>\n  </div>\n</div>\n\n'}),define("views/home/home",["backbone","jquery","underscore","shared/views/base","shared/collections/modelsCache","./../graphs/forecast","./realTime","./../graphs/currentGreenGauge","./../graphs/scores","text!./home.html"],function(e,t,n,r,i,s,o,u,a,f){return r.extend({initialize:function(e){this.forecast=new s,this.realTime=new o,this.currentGreenGauge=new u,this.scores=new a,i.home.on("sync",this.doRender,this)},events:{"click .section":"onSectionClicked"},render:function(){return this.$el.html(f),this.$(".loading").css("display","table"),this.$(".content").hide(),i.home.set({id:i.currentUser}),i.home.fetch(),this},doRender:function(){this.$(".loading").hide(),this.$(".content").show();var e={currentConsumption:i.home.get("real_time_consumption"),currentGreenProduction:i.home.get("real_time_prod")},t={c3p1:'<i class="icon-warning-sign"></i> CO2 hour !',c3p2:"You're on track :-) !",c3p3:"<i class='icon-certificate'></i> Good job ! You're earning a Green Hour point",c2p1:"<i class='icon-warning - sign'></i> CO2 hour !",c2p2:"You're on track :-) !",c2p3:"You're on track :-) !",c1p1:"All good !",c1p2:"Time to earn a Green Hour point !",c1p3:"Time to earn a Green Hour point !"},n=[i.home.get("scores")[0],i.home.get("scores")[1],i.home.get("scores")[2],i.home.get("scores")[3],i.home.get("scores")[4],i.home.get("scores")[5]],r="c"+e.currentConsumption.current+"p"+e.currentGreenProduction.current,s=i.home.get("scores")[0].stars/i.home.get("monthly_target").stars;this.$(".bar-green-hour").width(100*s);var o=i.home.get("scores")[0].flags/i.home.get("monthly_target").flags;this.$(".bar-gray-hour").width(100*o),this.$("#real-time-tip").html(t[r]),this.forecast.setElement(this.$("#forecast")).render(),this.realTime.setElement(this.$("#real-time")).render(e),this.scores.setElement(this.$("#scores")).render(n)},onSectionClicked:function(n){var r=t(n.currentTarget).attr("data-target");r&&e.history.navigate(r,!0)}})}),define("text!views/login/login.html",[],function(){return'<div class="welcome height-100">\n  <div class="welcome-inner">\n    <div class="welcome-content">\n      <h3>Greenify</h3>\n\n      <h4>It\'s green time !</h4>\n      <div class="btn btn-success login">Login</div>\n    </div>\n\n  </div>\n\n</div>'}),define("views/login/login",["backbone","jquery","underscore","shared/views/base","text!./login.html"],function(e,t,n,r,i){return r.extend({initialize:function(e){},render:function(){return this.$el.html(i),this},events:{"click .login":"openHome"},openHome:function(){e.history.navigate("/home",!0)}})}),define("views/graphs/realTimeBreakdown",["jquery","underscore","shared/views/base"],function(e,t,n){return n.extend({initialize:function(e){},render:function(e){return this.options=e,this.doRender(),this.$el.height(300),this.settings={Solar:{color:"#779241"},Wind:{color:"#d3dc5a"},"Other Renewable":{color:"#b4d34f"},"Non Renewable":{color:"#C9C6B6"}},this},doRender:t.debounce(function(){var e=this;this.$el.dxPieChart({legend:{verticalAlignment:"bottom",horizontalAlignment:"center"},dataSource:this.options,series:[{argumentField:"name",valueField:"value"}],title:"Real time production",customizePoint:function(t){return{color:e.settings[t.argument].color}},margin:{left:0}})},100)})}),define("text!views/home/breakdown.html",[],function(){return""}),define("views/home/breakdown",["jquery","underscore","shared/collections/modelsCache","shared/views/base","./../graphs/realTimeBreakdown","text!./breakdown.html"],function(e,t,n,r,i,s){return r.extend({initialize:function(e){this.breakdown=new i},render:function(){this.$el.html(s);var e=n.home.get("real_time_prod").details;return this.breakdown.setElement(this.$el).render(e),this}})}),define("models/greenButtonConsumption",["backbone"],function(e){return e.Model.extend({urlRoot:"/api/green_button"})}),define("collections/greenButtonConsumptions",["underscore","backbone","models/greenButtonConsumption"],function(e,t,n){var r=t.Collection.extend({model:n,url:"/api/green_button"});return r}),define("views/graphs/greenButtonConsumption",["jquery","underscore","shared/collections/modelsCache","shared/views/base","collections/greenButtonConsumptions"],function(e,t,n,r,i){return r.extend({initialize:function(e){this.consumption=new i,this.consumption.on("sync",this.doRender,this)},render:function(e){return this.options=e||{},this.options.data=this.options.data||{last_day:moment().dayOfYear(),duration:6},this.options.data.user_id=n.currentUser,this.consumption.fetch({data:this.options.data}),this},doRender:function(){var t=e("<table/>");t.addClass("punchard");var n;$row=e("<tr/>");var r=0;for(var i=0;i<24;i++){var s=e("<th/>");s.html(i),$row.append(s)}t.append($row);var o=this;this.scores={stars:[],flags:[]},this.consumption.each(function(i){var s=i.get("date");if(moment(s).dayOfYear()>moment().dayOfYear())return;if(s!==n){if(r<-6)return;n=s,$row=e("<tr/>");var u=e("<td class='rowhead' colspan='24'/>");u.html(moment().add("days",r).format("MMM, ddd DD")),$row.append(u),t.append($row),$row=e("<tr/>"),t.append($row),r-=1}var u=e("<td/>");if(moment(s).dayOfYear()===moment().dayOfYear()&&i.get("hour")>=moment().hour())return $row.append(u);var a={1:"rgba(211, 220, 90, 0.2)",2:"rgba(180, 211, 79, 0.53)",3:"rgba(119, 146, 65, 0.7)"};u.css("background-color",a[i.get("fraction")]);var f=5+(i.get("consumption")-1)*6;u.css("font-size",f+"px"),i.get("consumption")==3&&i.get("fraction")==1&&(u.html('<i class="icon-flag"/>'),u.addClass("gray-hour"),u.css("font-size","10px"),o.scores.flags.push(i)),i.get("consumption")==3&&(i.get("fraction")==3||i.get("fraction")==2)&&(u.html('<i class="icon-star"/>'),u.addClass("green-hour"),u.css("font-size","10px"),o.scores.stars.push(i)),$row.append(u)}),this.$el.append(t),this.trigger("rendered")}})}),define("text!views/home/history.html",[],function(){return'<div class="history-container">\n  <h5>Convert your flags into stars !</h5>\n\n  <p>Here is how you did on the last 7 days.</p>\n\n  <div id="full-history"></div>\n\n  <table class="legend">\n    <tr>\n      <td class="item" style="background-color: rgba(211, 220, 90, 0.2)"></td>\n      <td class="value"><b>CO2 Hour</b> Limited production of green energy</td>\n    </tr>\n    <tr>\n      <td class="item" style="background-color: rgba(180, 211, 79, 0.53)"></td>\n      <td class="value">Regular production of green energy</td>\n    </tr>\n    <tr>\n      <td class="item" style="background-color: rgba(119, 146, 65, 0.7)"></td>\n      <td class="value"><b>Green hour</b> A lot of energy on the grid is produced by renewable sources!</td>\n    </tr>\n    <tr>\n      <td class="item"><i class="icon-star-empty"></i></td>\n      <td class="value">Good job :-) ! You\'ve used your energy-hungry equipments during a green peak</td>\n    </tr>\n    <tr>\n      <td class="item"><i class="icon-flag"></i></td>\n      <td class="value">Careful, you\'ve used a lot of energy during a CO2 Hour</td>\n    </tr>\n  </table>\n</div>\n\n<div class="row-fluid section" id="goal-data" data-target="/breakdown">\n\n</div>\n'}),define("text!views/home/goalData.html",[],function(){return'<div class="in-container">\n  <h4>My goals</h4>\n\n  <p>So far this month:</p>\n\n  <p><i class="icon-star-empty"></i> Green Hours <%= stars %>/<%= starsTotal %></p>\n\n  <p><i class="icon-flag"></i> CO2 Hours <%= flags %>/<%= flagsTotal %></p>\n\n</div>'}),define("views/home/history",["jquery","underscore","shared/collections/modelsCache","shared/views/base","./../graphs/greenButtonConsumption","text!./history.html","text!./goalData.html"],function(e,t,n,r,i,s,o){return r.extend({initialize:function(e){this.consumption=new i,this.consumption.on("rendered",this.postRender,this)},render:function(){this.$el.html(s);var e={};return e.data={last_day:moment().dayOfYear(),duration:6},this.consumption.setElement(this.$("#full-history")).render(e),this},postRender:function(){var e={stars:this.consumption.scores.stars.length,starsTotal:n.home.get("monthly_target").stars,flags:this.consumption.scores.flags.length,flagsTotal:-n.home.get("monthly_target").flags};this.$("#goal-data").html(t.template(o,e))}})}),define("text!views/navigation/navigation.html",[],function(){return'<span class="previous-page">\n      <i class="icon-chevron-left"></i> Back\n    </span>\n<span class="title"><%= title %></span>\n'}),define("views/navigation/navigation",["backbone","jquery","underscore","shared/views/base","text!./navigation.html"],function(e,t,n,r,i){return r.extend({initialize:function(e){},render:function(e){return this.$el.html(n.template(i,e)),e.hideBack&&this.$(".previous-page").hide(),this},events:{"click .previous-page":"onPreviousPageClick"},onPreviousPageClick:function(){window.history.back()}})}),define("text!views/tutorials/page1.html",[],function(){return'<h3>How green are you?</h3>\n\n<p>Power production means are varying through the day, as consumption, and weather, change.</p>\n\n<img width=\'200\' src="/images/tutorial-1.png"/>\n\n<p>Some hours are <strong class="green">greener</strong> than others thanks to strong wind and solar energy<br>\n  <span class="green">- Those are Green Hours</span>\n\n<p>Some other require more coal and gas power-plant, generating a lot more of <strong class="orange">CO2</strong><br>\n  <span class="orange">- Those are CO2 Hours</span>\n  \0</p>'}),define("text!views/tutorials/page2.html",[],function(){return'<h3>When do you have the greenest consumption?</h3>\n<p>Greenity has developed an easy monitoring tool to watch your consumption habits, per hour and per day.</p>\n<img width=\'240\' src="/images/tutorial-2.png"/>\n\n<h4 class="green">The greener, the better.</h4>\n\n    <p>Each <i class="green icon-star"></i> is an hour when your consumption was in line with the highest renewable production rates.</p>\n<p>A <i class="icon-flag orange"></i> is an hour when your consumption was high despite a low renewable production.</p>'}),define("text!views/tutorials/page3.html",[],function(){return'<h3> Can you go greener? </h3>\n\n    <h4>Yes!</h4>\n<p>We are providing you with real-time information to compare your level of <span class="orange">consumption</span> to the level of <span class="green">renewable production</span>.</p>\n\n<img width=\'240\' src="/images/tutorial-3.1.png"/>\n\n<p>Try to align them to be as green as possible.</p>\n\n<p>We also forecast for you the next greenest hours so you can be prepared.</p>\n<img width=\'140\' src="/images/tutorial-3.2.png"/>\n\n'}),define("text!views/tutorials/page4.html",[],function(){return"<h4>Now</h4>\n\n<h3>Improve yourself!</h3>\n\n    <p>Review your goals for the months…</p>\n\0\n<img width='240' src=\"/images/tutorial-4.1.png\"/>\n\n    <p>… and go greener month after month!</p>\n\n<img width='240' src=\"/images/tutorial-4.2.png\"/>\n\n"}),define("text!views/tutorials/page5.html",[],function(){return'<div class="start">\n  <h3>Ready :-) ?</h3>\n  <button class="btn btn-success">Start</button>\n</div>'}),define("text!views/tutorials/tutorials.html",[],function(){return'<div id="myCarousel" class="carousel slide height-100" data-interval="false">\n  <!-- Carousel items -->\n  <div class="carousel-inner">\n    <div id="page1" class="active item"></div>\n    <div id="page2" class="item"></div>\n    <div id="page3" class="item"></div>\n    <div id="page4" class="item"></div>\n    <div id="page5" class="item"></div>\n  </div>\n  <!-- Carousel nav -->\n  <a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>\n  <a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>\n</div>'}),define("views/tutorials/tutorials",["backbone","jquery","underscore","shared/views/base","text!./page1.html","text!./page2.html","text!./page3.html","text!./page4.html","text!./page5.html","text!./tutorials.html"],function(e,t,n,r,i,s,o,u,a,f){return r.extend({initialize:function(e){},render:function(){return this.$el.html(f),this.slidCount=0,this.$("#page1").html(i),this.$("#page2").html(s),this.$("#page3").html(o),this.$("#page4").html(u),this.$("#page5").html(a),this},events:{"click .btn":"openApp",slid:"onSlid"},openApp:function(){e.history.navigate("/home",!0)},onSlid:function(e){this.slidCount+=1,this.slidCount==4&&this.$(".carousel-control").hide()}})}),define("router",["jquery","underscore","backbone","views/home/home","views/login/login","views/home/breakdown","views/home/history","views/navigation/navigation","views/tutorials/tutorials"],function(e,t,n,r,i,s,o,u,a){return n.Router.extend({routes:{"":"root",home:"home",tutorial:"tutorial",breakdown:"realTimeBreakdown",history:"history","*catchAll":"notFound"},initialize:function(e){this.$leftPane=e.find("#left-pane-inner"),this.$navBar=e.find("#navigation"),this.views={home:{view:new r,rendered:!1},breakdown:{view:new s,rendered:!1},history:{view:new o,rendered:!1},navigation:{view:new u,rendered:!1},login:{view:new i,rendered:!1},tutorial:{view:new a,rendered:!1}}},renderView:function(n,r,i,s){n.find("#pane-contents").detach();if(!r)return;var o=this.views[r];if(!o)throw new Error("View not found "+r);t.isMobile()&&window.scrollTo(0,1);if(s||!o.rendered){var u=e('<div id="pane-contents" class="height-100 paneContents-'+r+'"></div>');o.view.setElement(u).render(i)}n.append(o.view.$el),o.rendered=!0,this.views[r]=o},home:function(){this.renderView(this.$leftPane,"home"),this.renderView(this.$navBar,"navigation",{title:"Home",hideBack:!0},!0),n.history.navigate("/"),this.$navBar.show()},root:function(){this.isLoggedIn?this.home():(this.isLoggedIn=!0,this.login())},login:function(){this.renderView(this.$leftPane,"login",{},!0),this.$navBar.hide()},tutorial:function(){this.renderView(this.$leftPane,"tutorial",{},!0),this.$navBar.hide()},notFound:function(){this.root()},realTimeBreakdown:function(){this.renderView(this.$leftPane,"breakdown",{},!0),this.renderView(this.$navBar,"navigation",{title:"Real Time"},!0)},history:function(){this.renderView(this.$leftPane,"history",{},!0),this.renderView(this.$navBar,"navigation",{title:"History"},!0)}})}),define("text!layout.html",[],function(){return'<div id="nav_bar"></div>\n<div id="body" class="height-100 container body">\n  <section id="navigation"></section>\n\n  <div class="row containerRow height-100">\n    <section id="left-pane" class="span8 scrollable height-100">\n      <div id="left-pane-inner" class="height-100"></div>\n    </section>\n    <section id="right-pane" class="span4">\n      <div id="right-pane-inner" class="scrollable"></div>\n    </section>\n\n  </div>\n</div>'}),define("layout",["jquery","underscore","shared/views/base","text!./layout.html"],function(e,t,n,r){var i=n.extend({el:"body",initialize:function(){},events:{"touchmove .scrollable":"onScrollableTouch"},render:function(){return this.$el.html(r),this},onScrollableTouch:function(e){e.stopPropagation()}});return i}),define("init",["underscore","jquery","backbone","./router","./layout"],function(e,t,n,r,i){var s=t("body");(new i).render();var o=new r(s);n.history.start({pushState:!0})});
define(["jquery","underscore","shared/views/base"],function(e,t,n){return n.extend({initialize:function(e){},render:function(e){return this.options=e,this.doRender(),this.$el.height(200),this},doRender:t.debounce(function(){this.$el.dxChart({dataSource:this.options,commonSeriesSettings:{argumentField:"month",type:"bar"},series:[{valueField:"grayHours",name:"CO2 Hours",color:"#C9C6B6"},{valueField:"greenHours",name:"Green Hours",color:"#779241"}],legend:{verticalAlignment:"center",horizontalAlignment:"center"}})},100)})});
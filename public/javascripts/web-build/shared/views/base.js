define(["backbone"],function(e){return e.View.extend({getQueryParams:function(){var e=window.location.search.substring(1).split("&"),t={};for(var n in e){if(e[n]==="")continue;var r=e[n].split("=");t[decodeURIComponent(r[0])]=decodeURIComponent(r[1])}return t},clean:function(){this.remove(),this.unbind()}})});
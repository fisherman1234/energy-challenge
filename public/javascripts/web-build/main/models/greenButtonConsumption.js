define(["backbone"],function(e){return e.Model.extend({urlRoot:"/api/green_button",parse:function(e){return e.consumption=parseFloat(e.consumption),e.fraction=100*parseFloat(e.fraction),e}})});
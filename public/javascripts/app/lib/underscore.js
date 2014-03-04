define([
  'components/underscore-amd/underscore',
  'lib/utilities/hl-underscore'
], function(_, hlUnderscore) {

   _.mixin(hlUnderscore);
  return _;

});

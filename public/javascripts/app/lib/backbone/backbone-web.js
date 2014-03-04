
define([
  'underscore',
  'backbone',
  'types'
], function(_, Backbone, types) {

  var BackboneWebmodel = Backbone.Model.extend({
    get: function(attr){
      return this.toJSON()[attr];

    },
    getSchema: function() {
      if (_.isFunction(this.schema)) { return this.schema(); }
      return this.schema;
    },

    isValid: function(column) {
      if (column) { return !this.checkType(this.getSchema()[column].type, this.attributes[column]); }
      return Backbone.Model.prototype.isValid.apply(this);
    },

    isExistingFieldsValid: function() {
      var isValid;
      var self = this;
      _.detect(_.keys(this.attributes), function(attribute) {
        return !self.isValid(attribute);
      }, function(result) {
        isValid = (result === undefined ? true : false);
      });
      return isValid;
    },

    validate: function(attrs) {
      if (this.getSchema() === undefined) { return false; }

      var errors = [];
      _.each(this.getSchema(), function(typeDef, column) {
        var value = attrs[column];

        // skip if empty and optional
        if (value === undefined && typeDef.optional === true) { return; }

        // use default as the column value for type checking
        if (value === undefined && _.has(typeDef, 'defaults')) {
          value = (_.isFunction(typeDef.defaults) ? typeDef.defaults() : typeDef.defaults);
        }

        // perform typecheck
        var error = this.checkType(typeDef.type, value);
        if (error) { errors.push({ error: error, column: column, value: value }); }
      }, this);

      // return an array of errors if any
      if (errors.length) {
        return errors;
        var error = new Error();
        error.message += _.map(errors, function(errorMeta) {
          return errorMeta.error.message + ': column: ' + errorMeta.column + ' value: ' + errorMeta.value;
        }).join(', ');
        return error;
      }
      return false;
    },

    checkType: function(type, value) {
      if (!types.hasOwnProperty(type)) { return new Error('Invalid data type'); }
      if (!types[type].checkType) { return false; } // no error if no checkType function

      var errors = types[type].checkType(value)._errors;
      if (errors.length) { return errors.shift(); }
      return false;
    },


    getSchemaDefaults: function() {
      var defaults = {};
      _.each(this.getSchema(), function(typeDef, column) {
        if (!_.has(typeDef, 'defaults')) { return; }
        defaults[column] = _.isFunction(typeDef.defaults) ? typeDef.defaults() : typeDef.defaults;
      });
      return defaults;
    },

    // overriding backbone defaults
    toJSON: function(options) {
      options = options || {};
      options.defaults = (options.defaults === undefined ? true : false);

      var json = Backbone.Model.prototype.toJSON.apply(this);
      var self = this;
      _.each(_.keys(json), function(column, done) {
        if (!self.getSchema().hasOwnProperty(column)) { delete json[column]; return; }
        if (json[column] === undefined) { json[column] = null; }
      });

      if (options.defaults) {
        json = _.extend(this.getSchemaDefaults(), json);
      }

      return json;
    },

    // overriding backbone defaults
    parse: function(resp) {
      var self = this;
      resp = resp.data;
      if (!resp) { return {}; }

      var respData = {};
      _.each(resp, function(value, key) {
        var schema = self.getSchema();
        if (!schema[key]) { return; }
        respData[key] = self.castType(schema[key].type, resp[key]);
      });

      return respData;
    },

    castType: function(type, value) {
      if (!types.hasOwnProperty(type)) { return new Error('Invalid data type'); }
      return (types[type].sanitize ? types[type].sanitize(value) : value);
    },
    url: function () {
      var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
      if (this.isNew()) return base + '.json';
      return base + (base.charAt(base.length - 1) == '/' ? '' : '/') +
        encodeURIComponent(this.id) + '.json';
    }

  });

  return BackboneWebmodel;

});

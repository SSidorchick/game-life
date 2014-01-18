define([
  'underscore',
	'backbone',
  'text!models/patterns.json'
],
function( _, Backbone, Patterns) {
  'use strict';

	return Backbone.Model.extend({
		defaults: {
      running: false,
      delay: 400,
      dimension: 50
    },

    initialize: function() {
      this.maxDelay = 3200;
      this.minDelay = 50;
      this.set('defaultDelay', this.get('delay'));
      this._setPatterns();

      this.on('change:running', this._processField.bind(this));
      this.on('change:pattern', this._setFieldPattern.bind(this));
      this.on('action:step-forward', this._stepForward.bind(this));
    },

    increaseSpeed: function() {
      this._setDelay(this.get('delay') / 2);
    },

    decreaseSpeed: function() {
      this._setDelay(this.get('delay') * 2);
    },

    setField: function(field) {
      this.field = field;

      this._setPatterns({ height: this.field.height, width: this.field.width });
      // Remove previos pattern, because when it matches with default change event will not triggered.
      this.unset('pattern', { silent: true });
      // Setting default pattern.
      this.set('pattern', 'Glider');
    },

    _setFieldPattern: function() {
      this.set('running', false);

      var patternKey = this.get('pattern');
      var pattern = _.find(this.get('patterns'), function(p) {
        return p.key === patternKey;
      });

      this.field.setPattern(pattern);
    },

    _setPatterns: function(fieldDimensions) {
      var patterns = JSON.parse(Patterns);

      if (fieldDimensions) {
        patterns = _.filter(patterns, function(pattern) {
          if (pattern.requiredDimensions) {
            return pattern.requiredDimensions.width <= fieldDimensions.width &&
                   pattern.requiredDimensions.height <= fieldDimensions.height;
          } else {
            return true;
          }
        });
      }

      this.set('patterns', patterns);
    },

    _setDelay: function(delay) {
      if (delay >= this.minDelay && delay <= this.maxDelay) {
        this.set('delay', delay);
      }
    },

    _processField: function() {
      if (this.get('running')) {
        this.field.runStep();
        _.delay(this._processField.bind(this), this.get('delay'));
      }
    },

    _stepForward: function() {
      this.set('running', false);
      this.field.runStep();
    }
  });
});

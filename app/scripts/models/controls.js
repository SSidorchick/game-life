define([
	'backbone'
],
function( Backbone ) {
  'use strict';

	return Backbone.Model.extend({
		defaults: {
      running: false,
      speed: 500
    },

    initialize: function() {
      this.speedDelta = 100;
      this.minSpeed = 1000;
      this.maxSpeed = 100;
    },

    setSpeed: function(speed) {
      if (this._canSetSpeed(speed)) {
        this.set('speed', speed);
      } else {
        // Trigger change event to rewrite invalide ui value.
        this.trigger('change');
      }
    },

    addSpeed: function() {
      this.setSpeed(this.get('speed') - this.speedDelta);
    },

    subSpeed: function() {
      this.setSpeed(this.get('speed') + this.speedDelta);
    },

    _canSetSpeed: function(speed) {
      return speed >= this.maxSpeed && speed <= this.minSpeed;
    }
  });
});

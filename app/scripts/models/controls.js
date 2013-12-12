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

    setSpeed: function(speed) {
      if (this._canSetSpeed(speed)) {
        this.set('speed', speed);
      } else {
        // Trigger change event to rewrite invalide ui value.
        this.trigger('change');
      }
    },

    changeSpeed: function(delta) {
      this.setSpeed(this.get('speed') + delta);
    },

    _canSetSpeed: function(speed) {
      return speed >= 100 && speed <= 1000;
    }
  });
});

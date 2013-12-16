define([
	'backbone'
],
function( Backbone ) {
  'use strict';

	return Backbone.Model.extend({
		defaults: {
      running: false,
      speed: 500,
      dimension: 30
    },

    initialize: function() {
      this.speedDelta = 100;
      this.minSpeed = 1000;
      this.maxSpeed = 100;

      this.dimensionDelta = 10;
      this.minDimension = 10;
      this.maxDimension = 100;
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
    },

    setDimension: function(dimension) {
      if (this._canSetDimension(dimension)) {
        this.set('dimension', dimension);
      } else {
        // Trigger change event to rewrite invalide ui value.
        this.trigger('change');
      }
    },

    addDimension: function() {
      this.setDimension(this.get('dimension') + this.dimensionDelta);
    },

    subDimension: function() {
      this.setDimension(this.get('dimension') - this.dimensionDelta);
    },

    _canSetDimension: function(dimension) {
      return dimension >= this.minDimension && dimension <= this.maxDimension;
    }
  });
});

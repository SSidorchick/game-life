define([
	'backbone'
],
function( Backbone ) {
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

      this.dimensionDelta = 10;
      this.minDimension = 10;
      this.maxDimension = 100;
    },

    setDelay: function(delay) {
      if (this._canSetDelay(delay)) {
        this.set('delay', delay);
      }
    },

    increaseSpeed: function() {
      this.setDelay(this.get('delay') / 2);
    },

    decreaseSpeed: function() {
      this.setDelay(this.get('delay') * 2);
    },

    _canSetDelay: function(delay) {
      return delay >= this.minDelay && delay <= this.maxDelay;
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

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
    }
  });
});

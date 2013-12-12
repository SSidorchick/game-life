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

    changeSpeed: function(delta) {
      var result = this.get('speed') + delta;
      if (result >= 100 && result <= 1000) {
        this.set('speed', result);
      }
    }
  });
});

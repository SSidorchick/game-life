define([
	'backbone'
],
function( Backbone ) {
  'use strict';

	return Backbone.Model.extend({
		defaults: {
      speed: 500
    },

    changeSpeed: function(delta) {
      this.set('speed', this.get('speed') + delta);
    }
  });
});

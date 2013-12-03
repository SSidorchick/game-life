define([
	'backbone'
],
function( Backbone ) {
  'use strict';

	return Backbone.Model.extend({
    defaults: {
      isAlive: false,
    },

    toggleAlive: function() {
      this.set('isAlive', !this.get('isAlive'));
    }
  });
});

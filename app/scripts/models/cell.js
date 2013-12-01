define([
	'backbone'
],
function( Backbone ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
      defaults: {
        isAlive: false,
      },

      initialize: function() {
        console.log("initialize a Cell model");
      }
    });
});

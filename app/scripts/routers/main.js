define([
	'backbone',
  'controllers/main'
],
function(Backbone, Controller){
  'use strict';

	return Backbone.Marionette.AppRouter.extend({
    controller: new Controller(),
		appRoutes: {
      '': 'index'
    },

    initialize: function() {
      this.controller.router = this;
    }
	});
});

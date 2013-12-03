define([
  'jquery',
	'backbone',
	'communicator',
  'routers/main'
],

function($, Backbone, Communicator, MainRouter) {
  'use strict';

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
  App.addRegions({});

  App.addInitializer(function() {
    new MainRouter();
    Backbone.history.start();
  });
  
  return App;
});

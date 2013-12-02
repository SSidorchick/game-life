define([
  'jquery',
	'backbone',
	'communicator',
	'hbs!tmpl/welcome',
  'collections/field',
  'views/composite/field'
],

function($, Backbone, Communicator, Welcome_tmpl, Field, FieldView ) {
  'use strict';

	var welcomeTmpl = Welcome_tmpl;

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({});

  App.addInitializer(function() {
    // Pass null model collection, because Field calss generate models by itself.
    var field = new Field(null, { height: 30, width: 30 });
    var fieldView = new FieldView({ collection: field });
    $(document.body).append(fieldView.render().el);
  });

	return App;
});

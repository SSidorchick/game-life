define([
  'jquery',
  'backbone',
  'regions/app',
  'views/layout/main',
  'collections/field',
  'views/collection/field'
],
function($, Backbone, AppRegion, MainLayout, Field, FieldView) {
  'use strict';

	return Backbone.Marionette.Controller.extend({
    index: function() {
      var mainLayot = new MainLayout();
      AppRegion.show(mainLayot);

      // Pass null model collection, because Field calss generate models by itself.
      var field = new Field(null, { height: 30, width: 30 });
      var fieldView = new FieldView({ collection: field });

      mainLayot.field.show(fieldView);
    }
	});
});

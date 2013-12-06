define([
  'jquery',
  'backbone',
  'collections/field',
  'regions/app',
  'views/layout/main',
  'views/item/controls',
  'views/collection/field'
],
function($, Backbone, Field, AppRegion, MainLayout, ControlsView, FieldView) {
  'use strict';

	return Backbone.Marionette.Controller.extend({
    index: function() {
      var mainLayot = new MainLayout();
      AppRegion.show(mainLayot);

      var controlsView = new ControlsView();
      mainLayot.controls.show(controlsView);

      // Pass null model collection, because Field calss generate models by itself.
      var field = new Field(null, { height: 30, width: 30 });
      var fieldView = new FieldView({ collection: field });
      mainLayot.field.show(fieldView);
    }
	});
});

define([
  'jquery',
  'backbone',
  'regions/app',
  'collections/field',
  'views/composite/field'
],
function($, Backbone, AppRegion, Field, FieldView) {
  'use strict';

	return Backbone.Marionette.Controller.extend({
    index: function() {
      // Pass null model collection, because Field calss generate models by itself.
      var field = new Field(null, { height: 30, width: 30 });
      var fieldView = new FieldView({ collection: field });
      AppRegion.show(fieldView);
    }
	});
});

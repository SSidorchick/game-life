define([
  'jquery',
  'backbone',
  'models/controls',
  'collections/field',
  'regions/app',
  'views/layout/main',
  'views/item/controls',
  'views/collection/field'
],
function($, Backbone, Controls, Field, AppRegion, MainLayout, ControlsView, FieldView) {
  'use strict';

	return Backbone.Marionette.Controller.extend({
    index: function() {
      var mainLayot = new MainLayout();
      AppRegion.show(mainLayot);

      mainLayot.controls.show(this._createControls());
      mainLayot.field.show(this._createField());
    },

    _createControls: function() {
      this.controls = new Controls();
      this.listenTo(this.controls, 'change:running', this._processField.bind(this));

      var view = new ControlsView({ model: this.controls });

      return view;
    },

    _createField: function() {
      // Pass null model collection, because Field calss generate models by itself.
      this.field = new Field(null, { height: 30, width: 30 });
      var view = new FieldView({ collection: this.field });

      return view;
    },

    _processField: function() {
      if (this.controls.get('running')) {
        this.field.runStep();
        setTimeout(this._processField.bind(this), this.controls.get('speed'));
      }
    }
	});
});

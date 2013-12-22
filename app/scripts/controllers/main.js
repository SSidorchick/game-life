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
      this.mainLayot = new MainLayout();
      AppRegion.show(this.mainLayot);

      this._createControls();
      this._createField();
    },

    _createControls: function() {
      this.controls = new Controls();
      this.listenTo(this.controls, 'change:running', this._processField.bind(this));

      var view = new ControlsView({ model: this.controls });
      this.mainLayot.controls.show(view);
    },

    _createField: function() {
      // Pass null model collection, because Field calss generate models by itself.
      var dimension = this.controls.get('dimension');
      this.field = new Field(null, { height: dimension, width: dimension });

      var view = new FieldView({ collection: this.field });
      this.mainLayot.field.show(view);
    },

    _processField: function() {
      if (this.controls.get('running')) {
        this.field.runStep();
        setTimeout(this._processField.bind(this), this.controls.get('delay'));
      }
    }
	});
});

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

      this.controls = new Controls();
      mainLayot.controls.show(this._createControlsView(this.controls));
      mainLayot.field.show(this._createFieldView());
    },

    _createControlsView: function(model) {
      var controlsView = new ControlsView({ model: model });
      this.listenTo(controlsView, 'controls:start', this._start);
      this.listenTo(controlsView, 'controls:stop', this._stop);
      this.listenTo(controlsView, 'speed:add', function() { this._changeSpeed(-100); });
      this.listenTo(controlsView, 'speed:sub', function() { this._changeSpeed(100); });

      return controlsView;
    },

    _createFieldView: function() {
      // Pass null model collection, because Field calss generate models by itself.
      this.field = new Field(null, { height: 30, width: 30 });
      var fieldView = new FieldView({ collection: this.field });

      return fieldView;
    },

    _start: function() {
      this.controls.set('running', true);
      this._processField();
    },

    _stop: function() {
      this.controls.set('running', false);
    },

    _processField: function() {
      if (this.controls.get('running')) {
        this.field.runStep();
        setTimeout(this._processField.bind(this), this.controls.get('speed'));
      }
    },

    _changeSpeed: function(delta) {
      this.controls.changeSpeed(delta);
    }
	});
});

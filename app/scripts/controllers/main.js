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

      mainLayot.controls.show(this._createControlsView());
      mainLayot.field.show(this._createFieldView());
    },

    _createControlsView: function() {
      var controlsView = new ControlsView();
      this.listenTo(controlsView, 'controls:start', this._start);
      this.listenTo(controlsView, 'controls:stop', this._stop);

      return controlsView;
    },

    _createFieldView: function() {
      // Pass null model collection, because Field calss generate models by itself.
      this.field = new Field(null, { height: 30, width: 30 });
      var fieldView = new FieldView({ collection: this.field });

      return fieldView;
    },

    _start: function() {
      this.intervalId = setInterval(function() {
        this.field.runStep();
      }.bind(this), 1000);
      console.log('started');
    },

    _stop: function() {
      console.log('stopped');
      clearInterval(this.intervalId);
    }
	});
});

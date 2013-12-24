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
      // Maximum field area width = document width - container padding - field (border + padding-left).
      var areaWidth = $(document).width() - 30 - 3;
      var width = this._getResponsiveFieldDimension(areaWidth);
      // Maximum field area height = document height - title height - controls height - field (border + padding-left).
      var areaHeight = $(document).height() - 59 - 77 - 3;
      var height = this._getResponsiveFieldDimension(areaHeight);
      // Pass null model collection, because Field calss generates models by itself.
      this.field = new Field(null, { height: height, width: width });

      var view = new FieldView({ collection: this.field });
      this.mainLayot.field.show(view);
    },

    _processField: function() {
      if (this.controls.get('running')) {
        this.field.runStep();
        setTimeout(this._processField.bind(this), this.controls.get('delay'));
      }
    },

    _getResponsiveFieldDimension: function(clientDimension) {
      var maxDimension = this.controls.get('dimension');
      var cellsDimension = Math.floor(clientDimension / 10);
      return Math.min(cellsDimension, maxDimension);
    }
	});
});

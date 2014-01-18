define([
  'jquery',
  'underscore',
  'backbone',
  'models/controls',
  'collections/field',
  'regions/app',
  'views/layout/main',
  'views/item/controls',
  'views/item/spinner',
  'views/collection/field'
],
function($, _, Backbone, Controls, Field, AppRegion, MainLayout, ControlsView, SpinnerView, FieldView) {
  'use strict';

	return Backbone.Marionette.Controller.extend({
    index: function() {
      this.mainLayot = new MainLayout();
      AppRegion.show(this.mainLayot);

      this.spinnerView = new SpinnerView();
      this._createControls();
      this._createField(this._getFieldDimensions());

      this._handleFieldRecreateEvents();
    },

    _createControls: function() {
      this.controls = new Controls();

      var view = new ControlsView({ model: this.controls });
      this.mainLayot.controls.show(view);
    },

    _createField: function(dimensions) {
      // Pass null model collection, because Field calss generates models by itself.
      this.field = new Field(null, dimensions);

      var view = new FieldView({ collection: this.field });
      this.mainLayot.field.show(view);

      this.controls.setField(this.field);
    },

    _shouldCreateField: function(dimensions) {
      if (this.field &&
          this.field.height === dimensions.height &&
          this.field.width === dimensions.width) {
        return false;
      } else {
        return true;
      }
    },

    _getFieldDimensions: function() {
      // TODO: Replace jQuery usage.
      var elemntWidth = $('#field').width();
      // TODO: Replace jQuery usage.
      // Subtracting addtional value to prevent vertical scroll appearance in come cases (e.g. iPad 2).
      var elemntHeight = $('#field').height() - 3;

      var width = this._getResponsiveFieldDimension(elemntWidth, this.controls.get('dimension'));
      var height = this._getResponsiveFieldDimension(elemntHeight);

      return { height: height, width: width };
    },

    _getResponsiveFieldDimension: function(clientDimension, limit) {
      var cellDimension = Math.floor(clientDimension / 10);
      if (limit) {
        return Math.min(cellDimension, limit);
      } else {
        return cellDimension;
      }
    },

    _handleFieldRecreateEvents: function() {
      var debouncedCreateField = _.debounce((function(dimensions) {
        this._createField(dimensions);
        this.spinning = false;
      }).bind(this), 500);

      $(window).on('resize orientationchange', (function(e) {
        var dimensions = this._getFieldDimensions();
        if (e.type === 'resize' && !this._shouldCreateField(dimensions)) {
          return;
        }

        if (!this.spinning) {
          this.spinning = true;
          this.mainLayot.field.show(this.spinnerView);
        }

        debouncedCreateField(dimensions);
      }).bind(this));
    }
	});
});

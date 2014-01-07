define([
  'jquery',
  'backbone',
  'models/controls',
  'collections/field',
  'regions/app',
  'views/layout/main',
  'views/item/controls',
  'views/item/spinner',
  'views/collection/field'
],
function($, Backbone, Controls, Field, AppRegion, MainLayout, ControlsView, SpinnerView, FieldView) {
  'use strict';

	return Backbone.Marionette.Controller.extend({
    index: function() {
      this.mainLayot = new MainLayout();
      AppRegion.show(this.mainLayot);

      this.spinnerView = new SpinnerView();
      this._createControls();
      // TODO: Remove circular dependency. _getFieldDimensions method should not depend on controls object.
      var dimensions = this._getFieldDimensions();
      this.controls.setAvailablePatterns(dimensions);
      this._createField(dimensions);

      $(window).on('resize orientationchange', (function() {
        // TODO: Remove circular dependency. _getFieldDimensions method should not depend on controls object.
        var dimensions = this._getFieldDimensions();
        this.controls.setAvailablePatterns(dimensions);
        this._createField(dimensions);
      }).bind(this));
    },

    _createControls: function() {
      this.controls = new Controls();
      this.listenTo(this.controls, 'change:running', this._processField.bind(this));
      this.listenTo(this.controls, 'change:pattern', this._changeFieldPattern.bind(this));
      this.listenTo(this.controls, 'action:step-forward', this._stepForward.bind(this));

      var view = new ControlsView({ model: this.controls });
      this.mainLayot.controls.show(view);
    },

    _createField: function(dimensions) {
      if (this.field &&
          this.field.height === dimensions.height &&
          this.field.width === dimensions.width) {
        return;
      }

      if (!this.rendering) {
        this.mainLayot.field.show(this.spinnerView);
        this.rendering = true;
      }

      setTimeout((function() {
        // Pass null model collection, because Field calss generates models by itself.
        this.field = new Field(null, dimensions);

        var view = new FieldView({ collection: this.field });
        this.mainLayot.field.show(view);

        this.rendering = false;
      }).bind(this), 50); // Settings timeout to let browser render spinner.
    },

    _processField: function() {
      if (this.controls.get('running')) {
        this.field.runStep();
        setTimeout(this._processField.bind(this), this.controls.get('delay'));
      }
    },

    _changeFieldPattern: function() {
      var pattern = this.controls.get('pattern');
      this.controls.set('running', false);
      this.field.changePattern(pattern);
    },

    _stepForward: function() {
      this.controls.set('running', false);
      this.field.runStep();
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
    }
	});
});

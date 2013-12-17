define([
	'backbone',
	'hbs!tmpl/item/controls'
],
function( Backbone, ControlsTmpl ) {
  'use strict';

	return Backbone.Marionette.ItemView.extend({
    template: ControlsTmpl,
    ui: {
      run: '#run',
      speed: '#speed',
      dimension: '#dimension'
    },
		events: {
      'click #run': 'runClickHandler',
      'click #add-speed': 'addSpeedClickHandler',
      'click #sub-speed': 'subSpeedClickHandler',
      'change #speed': 'speedChangedHandler',
      'click #add-dimension': 'addDimensionClickHandler',
      'click #sub-dimension': 'subDimensionClickHandler',
      'change #dimension': 'dimensionChangedHandler'
    },
    modelEvents: {
      'change': 'render'
    },

    onRender: function() {
      if (this.model.get('running')) {
        this.ui.run.text('Stop');
      } else {
        this.ui.run.text('Start');
      }
      this.ui.speed.val(this.model.get('speed'));
      this.ui.dimension.val(this.model.get('dimension'));
    },
    
    runClickHandler: function(e) {
      e.preventDefault();

      if (this.model.get('running')) {
        this.model.set('running', false);
      } else {
        this.model.set('running', true);
      }
    },

    addSpeedClickHandler: function(e) {
      e.preventDefault();

      this.model.addSpeed();
    },

    subSpeedClickHandler: function(e) {
      e.preventDefault();

      this.model.subSpeed();
    },

    speedChangedHandler: function(e) {
      e.preventDefault();

      this.model.setSpeed(this.ui.speed.val());
    },

    addDimensionClickHandler: function(e) {
      e.preventDefault();

      this.model.addDimension();
    },

    subDimensionClickHandler: function(e) {
      e.preventDefault();

      this.model.subDimension();
    },

    dimensionChangedHandler: function(e) {
      e.preventDefault();

      this.model.setDimension(this.ui.dimension.val());
    }
	});
});

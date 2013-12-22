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
      'click #increase-speed': 'increaseSpeedClickHandler',
      'click #decrease-speed': 'decreaseSpeedClickHandler',
      'click #add-dimension': 'addDimensionClickHandler',
      'click #sub-dimension': 'subDimensionClickHandler',
      'change #dimension': 'dimensionChangedHandler'
    },
    modelEvents: {
      'change': 'render'
    },

    initialize: function(options) {
      this.defaultSpeed = options.model.get('speed');
    },

    onRender: function() {
      if (this.model.get('running')) {
        this.ui.run.toggleClass('fa-play fa-pause');
      }

      var speedText = this._getSpeedText(this.model.get('defaultDelay'), this.model.get('delay'));
      this.ui.speed.text(speedText);

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

    increaseSpeedClickHandler: function(e) {
      e.preventDefault();

      this.model.increaseSpeed();
    },

    decreaseSpeedClickHandler: function(e) {
      e.preventDefault();

      this.model.decreaseSpeed();
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
    },

    _getSpeedText: function(defaultDelay, delay) {
      var fraction = defaultDelay / delay;
      return fraction.toFixed(2) + 'X';
    }
	});
});

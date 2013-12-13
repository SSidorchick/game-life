define([
	'backbone',
	'hbs!tmpl/item/controls'
],
function( Backbone, ControlsTmpl ) {
  'use strict';

	return Backbone.Marionette.ItemView.extend({
    template: ControlsTmpl,
    ui: {
      speed: '#speed'
    },
		events: {
      'click #start': 'startClickHandler',
      'click #stop': 'stopClickHandler',
      'click #add-speed': 'addSpeedClickHandler',
      'click #sub-speed': 'subSpeedClickHandler',
      'change #speed': 'speedChangedHandler'
    },
    modelEvents: {
      'change': 'render'
    },

    onRender: function() {
      this.ui.speed.val(this.model.get('speed'));
    },
    
    startClickHandler: function(e) {
      e.preventDefault();

      this._processStartClick();
    },

    stopClickHandler: function(e) {
      e.preventDefault();

      this._processStopClick();
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

    _processStartClick: function() {
      this.trigger('controls:start');
    },

    _processStopClick: function() {
      this.trigger('controls:stop');
    }
	});
});

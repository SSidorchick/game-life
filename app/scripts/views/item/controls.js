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
      'click #add-speed': 'addSpeedHandler',
      'click #sub-speed': 'subSpeedHander'
    },
    
    startClickHandler: function(e) {
      e.preventDefault();

      this._processStartClick();
    },

    stopClickHandler: function(e) {
      e.preventDefault();

      this._processStopClick();
    },

    addClickHandler: function(e) {
      e.preventDefault();

      this._processStartClick();
    },

    subClickHandler: function(e) {
      e.preventDefault();

      this._processStopClick();
    },

    _processStartClick: function() {
      this.trigger('controls:start');
    },

    _processStopClick: function() {
      this.trigger('controls:stop');
    },

    _processAddSpeed: function() {
      this.trigger('speed:add');
    },

    _processSubSpeed: function() {
      this.trigger('speed:sub');
    }
	});
});

define([
	'backbone',
	'hbs!tmpl/item/controls'
],
function( Backbone, ControlsTmpl ) {
  'use strict';

	return Backbone.Marionette.ItemView.extend({
    template: ControlsTmpl,
		events: {
      'click #start': 'startClickHandler',
      'click #stop': 'stopClickHandler'
    },
    
    startClickHandler: function(e) {
      e.preventDefault();

      this._processStartClick();
    },

    stopClickHandler: function(e) {
      e.preventDefault();

      this._processStartClick();
    },

    _processStartClick: function() {
      this.trigger('controls:start');
    },

    _processStopClick: function() {
      this.trigger('controls:stop');
    }
	});
});

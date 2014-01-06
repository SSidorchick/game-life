define([
  'jquery',
	'backbone',
	'hbs!tmpl/item/controls'
],
function( $, Backbone, ControlsTmpl ) {
  'use strict';

	return Backbone.Marionette.ItemView.extend({
    template: ControlsTmpl,
    ui: {
      run: '#run',
      step: '#step-forward',
      speed: '#speed',
      patterns: '#patterns'

    },
    events: {
      'click #run': 'runClickHandler',
      'click #step-forward': 'stepForwardClickHandler',
      'click #increase-speed': 'increaseSpeedClickHandler',
      'click #decrease-speed': 'decreaseSpeedClickHandler',
      'change #patterns': 'patternChangeHandler'
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

      var speedText = this._renderSpeedText(this.model.get('defaultDelay'), this.model.get('delay'));
      this.ui.speed.text(speedText);

      var patterns = this._renderPatterns(this.model.get('availablePatterns'));
      this.ui.patterns.append(patterns);
      var pattern = this.model.get('pattern');
      if (pattern) {
        this.ui.patterns.val(pattern.key);
      }
    },

    runClickHandler: function(e) {
      e.preventDefault();

      if (this.model.get('running')) {
        this.model.set('running', false);
      } else {
        this.model.set('running', true);
      }
    },

    stepForwardClickHandler: function(e) {
      e.preventDefault();

      this.model.trigger('action:step-forward');
    },

    increaseSpeedClickHandler: function(e) {
      e.preventDefault();

      this.model.increaseSpeed();
    },

    decreaseSpeedClickHandler: function(e) {
      e.preventDefault();

      this.model.decreaseSpeed();
    },

    patternChangeHandler: function(e) {
      e.preventDefault();

      var patternKey = this.ui.patterns.children(':selected').text();
      this.model.changePattern(patternKey);
    },

    _renderSpeedText: function(defaultDelay, delay) {
      if (defaultDelay >= delay) {
        return defaultDelay / delay + 'X';
      } else {
        return '1/' + delay / defaultDelay + 'X';
      }
    },

    _renderPatterns: function(patterns) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < patterns.length; i++) {
        $('<option>').text(patterns[i].key).appendTo(fragment);
      }
      return fragment;
    }
	});
});

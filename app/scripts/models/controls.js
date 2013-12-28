define([
  'underscore',
	'backbone'
],
function( _, Backbone ) {
  'use strict';

	return Backbone.Model.extend({
		defaults: {
      running: false,
      delay: 400,
      dimension: 50,
      availablePatterns: [
        {
          key: 'Empty',
          start: [0, 0],
          value: []
        },
        {
          key: 'R-Pentomino',
          start: [0.5, 0.5],
          value: [[-1, 0], [-1, 1], [0, -1], [0, 0], [1, 0]]
        },
        {
          key: 'Glider',
          start: [0, 0],
          value: [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]]
        },
        {
          key: 'Glider Gun',
          start: [0.05, 0.05],
          value: [[4, 0], [4, 1], [5, 0], [5, 1],
                  [2, 12], [2, 13], [3, 11], [4, 10], [5, 10], [6, 10], [7, 11], [8, 12], [8, 13],
                  [5, 14],
                  [3, 15], [4, 16], [5, 16], [5, 17], [6, 16], [7, 15],
                  [1, 22], [2, 20], [2, 21], [3, 20], [3, 21], [4, 20], [4, 21], [5, 22],
                  [0, 24], [1, 24], [5, 24], [6, 24],
                  [2, 34], [2, 35], [3, 34], [3, 35]]
        }
      ]
    },

    initialize: function() {
      this.maxDelay = 3200;
      this.minDelay = 50;
      this.set('defaultDelay', this.get('delay'));
    },

    setDelay: function(delay) {
      if (this._canSetDelay(delay)) {
        this.set('delay', delay);
      }
    },

    increaseSpeed: function() {
      this.setDelay(this.get('delay') / 2);
    },

    decreaseSpeed: function() {
      this.setDelay(this.get('delay') * 2);
    },

    changePattern: function(patternKey) {
      var pattern = _.find(this.get('availablePatterns'), function(p) {
        return p.key === patternKey;
      });
      this.set('pattern', pattern);
    },

    _canSetDelay: function(delay) {
      return delay >= this.minDelay && delay <= this.maxDelay;
    }
  });
});

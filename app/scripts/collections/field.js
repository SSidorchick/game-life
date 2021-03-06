define([
	'backbone',
  'underscore',
  'models/cell'
],
function( Backbone, _, Cell ) {
  'use strict';

	return Backbone.Collection.extend({
    model: Cell,

		initialize: function(models, options) {
      this.height = options.height;
      this.width = options.width;

      for (var i = 0; i < this.height; i++) {
        for (var j = 0; j < this.width; j++) {
          this.push(new Cell());
        }
      }

      for (var i = 0; i < this.height; i++) {
        for (var j = 0; j < this.width; j++) {
          var cell = this.at(i * this.width + j);
          var neighbours = this._getNeighbours(i, j);
          cell.set('neighbours', neighbours);
        }
      }
		},

    runStep: function() {
      for (var i = 0; i < this.length; i++) {
        var cell = this.at(i);
        cell.generateNextState();
      }

      for (var i = 0; i < this.length; i++) {
        var cell = this.at(i);
        cell.switchNextState();
      }
    },

    setPattern: function(pattern) {
      this._resetField();

      var startX = Math.floor(pattern.start[1] * this.width);
      var startY = Math.floor(pattern.start[0] * this.height);
      for (var i = 0; i < pattern.value.length; i++) {
        var point = pattern.value[i];
        var cell = this.at((startY + point[0]) * this.width + startX + point[1]);
        cell.toggleAlive();
      }
    },

    _resetField: function() {
      for (var i = 0; i < this.length; i++) {
        var cell = this.at(i);
        cell.set('isAlive', false);
      }
    },

    _getNeighbours: function(i, j) {
      var neighbours = [];

      // top
      if (i - 1 >= 0 && j < this.width) {
        neighbours.push(this.at((i - 1) * this.width + j));
      }
      // top-right
      if (i - 1 >= 0 && j + 1 < this.width) {
        neighbours.push(this.at((i - 1) * this.width + j + 1));
      }
      // right
      if (j + 1 < this.width) {
        neighbours.push(this.at(i * this.width + j + 1));
      }
      // bottom-right
      if (i + 1 < this.height && j + 1 < this.width) {
        neighbours.push(this.at((i + 1) * this.width + j + 1));
      }
      // bottom
      if (i + 1 < this.height) {
        neighbours.push(this.at((i + 1) * this.width + j));
      }
      // bottom-left
      if (i + 1 < this.height && j - 1 >= 0) {
        neighbours.push(this.at((i + 1) * this.width + j - 1));
      }
      // left
      if (j - 1 >= 0) {
        neighbours.push(this.at(i * this.width + j - 1));
      }
      // top-left
      if (i - 1 >= 0 && j - 1 >= 0) {
        neighbours.push(this.at((i - 1) * this.width + j - 1));
      }

      return neighbours;
    }
	});
});

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
          var cell = this.at(i * 10 + j);
          var neighbours = this._getNeighbours(i, j);
          cell.set('neighbours', neighbours); 
        }
      }
		},

    _getNeighbours: function(i, j) {
      var neighbours = [];

      // top
      neighbours.push(this.at((i - 1) * 10 + j));
      // top-right
      neighbours.push(this.at((i - 1) * 10 + j + 1));
      // right
      neighbours.push(this.at(i * 10 + j + 1));
      // bottom-right
      neighbours.push(this.at((i + 1) + j + 1));
      // bottom
      neighbours.push(this.at((i + 1) + j));
      // bottom-left
      neighbours.push(this.at((i + 1) + j - 1));
      // left
      neighbours.push(this.at(i * 10 + j - 1));
      // top-left
      neighbours.push(this.at((i - 1) + j - 1));

      return _.compact(neighbours);
    }
	});
});

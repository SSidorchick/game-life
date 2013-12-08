define([
	'backbone',
  'underscore'
],
function( Backbone, _) {
  'use strict';

	return Backbone.Model.extend({
    defaults: {
      isAlive: false,
    },

    toggleAlive: function() {
      this.set('isAlive', !this.get('isAlive'));
    },

    generateNextState: function() {
      var aliveNeighboursCount = this._getAliveNegiboursCount();

      if (this.get('isAlive') && (aliveNeighboursCount < 2 || aliveNeighboursCount > 3)) {
        this.nextState = false;
      } else if (!this.get('isAlive') && aliveNeighboursCount === 3) {
        this.nextState = true;
      }
    },

    switchNextState: function() {
      this.set('isAlive', this.nextState);
    },

    _getAliveNegiboursCount: function() {
      var aliveNeighbours = _.filter(this.get('neighbours'), function(cell) {
        if (cell.get('isAlive')) {
          return cell;
        }
      });

      return aliveNeighbours.length;
    }
  });
});

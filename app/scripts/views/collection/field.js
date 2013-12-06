define([
	'backbone',
	'views/item/cell'
],
function( Backbone, Cell ) {
  'use strict';

	return Backbone.Marionette.CollectionView.extend({
    itemView: Cell,
    events: {
      'click': 'clicked'
    },

    initialize: function() {
      this.offsetY = this.el.offsetTop;
      this.offsetX = this.el.offsetLeft;
    },
		
    clicked: function(e) {
      // With 'click' event binding in Cell views event sometimes not fired.
      // With event delegation when event handled in Field view target sometimes is Field view itself instead of Cell view.
      // So, workaround is introduce to calculate the Cell view position from cursor position.
      var x = e.clientX - this.$el.offset().left;
      var y = e.clientY - this.$el.offset().top;

      var child = this.children.findByIndex(Math.floor(y / 10) * 30 + Math.floor(x / 10));
      child.model.toggleAlive();
    }
	});
});

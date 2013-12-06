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

    onShow: function() {
      this.offset = {
        left: this.$el.offset().left,
        top: this.$el.offset().top
      }
      this.dimensions = {
        height: this.$el.height(),
        width: this.$el.width()
      }
    },
		
    clicked: function(e) {
      e.preventDefault();
      this._clickCell(e.clientX, e.clientY);
    },

    _clickCell: function(clientX, clientY) {
      // With 'click' event binding in Cell views event sometimes not fired.
      // With event delegation when event handled in Field view target sometimes is Field view itself instead of Cell view.
      // So, workaround is introduce to calculate the Cell view position from cursor position.
      var x = clientX - this.offset.left;
      var y = clientY - this.offset.top;

      // Round values because can be less than 0 and greater than Field view dimensions.
      x = Math.min(Math.max(0, x), this.dimensions.width);
      y = Math.min(Math.max(0, y), this.dimensions.height - 1);

      var child = this.children.findByIndex(Math.floor(y / 10) * 30 + Math.floor(x / 10));
      child.model.toggleAlive();
    }
	});
});

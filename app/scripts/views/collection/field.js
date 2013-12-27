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

    onRender: function() {
      this.$el.height(this.collection.height * 10);
      this.$el.width(this.collection.width * 10);
    },

    clicked: function(e) {
      e.preventDefault();
      this._clickCell(e.clientX, e.clientY);
    },

    _clickCell: function(clientX, clientY) {
      // With 'click' event binding in Cell views event sometimes not fired.
      // With event delegation when event handled in Field view target sometimes is Field view itself instead of Cell view.
      // So, workaround is introduced to calculate the Cell view position from cursor position.
      var x = clientX - this.$el.offset().left;
      var y = clientY - this.$el.offset().top;

      // Round values because can be less than 0 and greater than Field view dimensions.
      x = Math.min(Math.max(0, x), this.$el.width() - 1);
      y = Math.min(Math.max(0, y), this.$el.height() - 1);

      var child = this.children.findByIndex(Math.floor(y / 10) * this.collection.width + Math.floor(x / 10));
      child.model.toggleAlive();
    }
	});
});

define([
	'backbone',
	'views/item/cell',
  'hbs!tmpl/composite/field'
],
function( Backbone, CellView, FieldTmpl ) {
  'use strict';

  return Backbone.Marionette.CompositeView.extend({
    template: FieldTmpl,
    itemView: CellView,
    itemViewContainer: '.field',
    events: {
      'click': 'clicked'
    },

    initialize: function() {
      console.log("initialize a Field CollectionView");
      this.offsetY = this.el.offsetTop;
      this.offsetX = this.el.offsetLeft;
    },

    clicked: function(e) {
      // With 'click' event binding in Cell views event sometimes not fired.
      // With query selector 'click .cell' event binding in Field view target sometimes is Field view itself.
      // So, workaround is introduce to calculate the Cell view position from cursor position.
      var x = e.clientX - this.$itemViewContainer.offset().left;
      var y = e.clientY - this.$itemViewContainer.offset().top;

      var child = this.children.findByIndex(Math.floor(y / 10) * 30 + Math.floor(x / 10));
      child.model.toggleAlive();
      //child.$el.toggleClass('alive');
    }
  });
});

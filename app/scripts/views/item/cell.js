define([
	'backbone',
	'hbs!tmpl/item/cell'
],
function( Backbone, CellTmpl  ) {
  'use strict';

  return Backbone.Marionette.ItemView.extend({
    template: CellTmpl,

    initialize: function() {
      console.log("initialize a Cell ItemView");
    },

    /* on render callback */
    onRender: function() {
      this.setElement(this.$el.children());
    }
  });
});

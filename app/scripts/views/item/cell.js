define([
	'backbone',
	'hbs!tmpl/item/cell'
],
function( Backbone, CellTmpl  ) {
  'use strict';

  return Backbone.Marionette.ItemView.extend({
    className: 'cell',
    template: CellTmpl,
    modelEvents: {
      'change': 'render'
    },

    onRender: function() {
      this.$el.toggleClass('alive', this.model.get('isAlive'));
    }
  });
});

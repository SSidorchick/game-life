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

    initialize: function() {
      console.log("initialize a Field CollectionView");
    },
  });
});

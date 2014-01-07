define([
  'backbone',
  'hbs!tmpl/item/spinner',
  'spin'
],
function( Backbone, SpinnerTmpl, Spinner ) {
  'use strict';

  return Backbone.Marionette.ItemView.extend({
    template: SpinnerTmpl,

		initialize: function() {
      this.spinner = new Spinner();
		},

    onShow: function() {
      // Removing Backbone nested div as contains border style.
      // TODO: Remove the hack.
      var parent = this.$el.parent();
      parent.empty();
      this.spinner.spin(parent[0]);
    },

    onClose: function() {
      this.spinner.stop();
    }

  });

});

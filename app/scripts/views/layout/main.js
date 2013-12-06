define([
	'backbone',
	'hbs!tmpl/layout/main'
],
function( Backbone, MainTmpl ) {
  'use strict';

	return Backbone.Marionette.Layout.extend({
    template: MainTmpl,
    regions: {
      field: '#field'
    }
	});
});

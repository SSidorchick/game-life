define([
	'backbone'
],
function( Backbone ) {
  'use strict';

  var singleton = function() {
    var Region = Backbone.Marionette.Region.extend({
      el: '#app'
    });

    return new Region();
  };

  return singleton();
});

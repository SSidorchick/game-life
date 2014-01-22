(function() {
	'use strict';

	var root = this;

	root.define([
		'regions/app'
		],
		function() {

			describe('App Region', function () {

				it('should be a singleton instance', function () {
          var app = require('regions/app');
          app.somePropery = 'some property';
          var app2 = require('regions/app');
          app2.somePropery.should.be.equal('some property');
				});

			});

		});

}).call( this );

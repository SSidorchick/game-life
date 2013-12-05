(function() {
	'use strict';

	var root = this;

	root.define([
		'regions/app'
		],
		function( App ) {

			describe('App Region', function () {

				it('should be an instance of App Region', function () {
					var app = new App();
					expect( app ).to.be.an.instanceof( App );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );
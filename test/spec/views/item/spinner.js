(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/spinner'
		],
		function( Spinner ) {

			describe('Spinner Itemview', function () {

				it('should be an instance of Spinner Itemview', function () {
					var spinner = new Spinner();
					expect( spinner ).to.be.an.instanceof( Spinner );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );
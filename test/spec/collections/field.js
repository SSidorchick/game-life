(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/field'
		],
		function( Field ) {

			describe('Field Collection', function () {

				it('should be an instance of Field Collection', function () {
					var field = new Field();
					expect( field ).to.be.an.instanceof( Field );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );
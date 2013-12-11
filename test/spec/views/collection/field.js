(function() {
	'use strict';

	var root = this;

	root.define([
		'views/collection/field'
		],
		function( Field ) {

			describe('Field Collectionview', function () {

				it('should be an instance of Field Collectionview', function () {
					var field = new Field();
					field.should.be.an.instanceof(Field);
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );

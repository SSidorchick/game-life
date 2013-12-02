(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/cell'
		],
		function( Cell ) {

			describe('Cell Itemview', function () {

				it('should be an instance of Cell Itemview', function () {
					var cell = new Cell();
					expect( cell ).to.be.an.instanceof( Cell );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );
(function() {
	'use strict';

	var root = this;

	root.define([
		'models/cell'
		],
		function( Cell ) {

			describe('Cell Model', function () {

				it('should be an instance of Cell Model', function () {
					var cell = new Cell();
					expect( cell ).to.be.an.instanceof( Cell );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );
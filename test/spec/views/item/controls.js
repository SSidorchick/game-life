(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/controls'
		],
		function( Controls ) {

			describe('Controls Itemview', function () {

				it('should be an instance of Controls Itemview', function () {
					var controls = new Controls();
					expect( controls ).to.be.an.instanceof( Controls );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );
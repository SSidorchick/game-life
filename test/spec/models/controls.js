(function() {
	'use strict';

	var root = this;

	root.define([
		'models/controls'
		],
		function( Controls ) {

			describe('Controls Model', function () {

				it('should be an instance of Controls Model', function () {
					var controls = new Controls();
					expect( controls ).to.be.an.instanceof( Controls );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );
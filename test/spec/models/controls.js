(function() {
	'use strict';

	var root = this;

	root.define([
		'models/controls'
		],
		function( Controls ) {

			describe('Controls Model', function () {

        beforeEach(function() {
				  root.controls = new Controls();
        });

        afterEach(function() {
          root.controls = null;
        });

				it('should be an instance of Controls Model', function () {
					root.controls.should.be.an.instanceof(Controls);
				});

				it('should have default attributes', function(){
          root.controls.get('running').should.be.false;
          root.controls.get('delay').should.equal(400);
          root.controls.get('dimension').should.equal(50);
				});

				it('should increase speed', function(){
          var current,
              minDelay = root.controls.minDelay;

          current = root.controls.get('delay');
          root.controls.increaseSpeed();
          root.controls.get('delay').should.equal(current / 2);

          current = root.controls.set('delay', minDelay);
          root.controls.increaseSpeed();
          root.controls.get('delay').should.equal(minDelay);
				});

				it('should decrease speed', function(){
          var current,
              maxDelay = root.controls.maxDelay;

          current = root.controls.get('delay');
          root.controls.decreaseSpeed();
          root.controls.get('delay').should.equal(current * 2);

          current = root.controls.set('delay', maxDelay);
          root.controls.decreaseSpeed();
          root.controls.get('delay').should.equal(maxDelay);
				});

			});

		});

}).call( this );

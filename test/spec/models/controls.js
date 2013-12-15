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
          root.controls.get('speed').should.equal(500);
				});

				it('should set speed', function(){
          var current,
              maxSpeed = root.controls.maxSpeed,
              minSpeed = root.controls.minSpeed;

          current = root.controls.get('speed');
          root.controls.setSpeed(current + 200);
          root.controls.get('speed').should.equal(current + 200);

          current = root.controls.get('speed');
          root.controls.setSpeed(maxSpeed - 1);
          root.controls.get('speed').should.equal(current);

          root.controls.setSpeed(minSpeed + 1);
          root.controls.get('speed').should.equal(current);
				});

				it('should add speed', function(){
          var current,
              maxSpeed = root.controls.maxSpeed,
              speedDelta = root.controls.speedDelta;

          current = root.controls.get('speed');
          root.controls.addSpeed();
          root.controls.get('speed').should.equal(current - speedDelta);

          current = root.controls.set('speed', maxSpeed);
          root.controls.addSpeed();
          root.controls.get('speed').should.equal(maxSpeed);
				});

				it('should substract speed', function(){
          var current,
              minSpeed = root.controls.minSpeed,
              speedDelta = root.controls.speedDelta;

          current = root.controls.get('speed');
          root.controls.subSpeed();
          root.controls.get('speed').should.equal(current + speedDelta);

          current = root.controls.set('speed', minSpeed);
          root.controls.subSpeed();
          root.controls.get('speed').should.equal(minSpeed);
				});
			});

		});

}).call( this );

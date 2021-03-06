(function() {
  'use strict';

  var root = this;

  root.define([
    'views/layout/main'
    ],
    function(Main) {

      describe('Main Layout', function () {

        it('should be an instance of Main Layout', function () {
          var main = new Main();
          expect(main).to.be.an.instanceof(Main);
        });

      });

    });

}).call( this );

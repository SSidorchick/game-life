(function() {
  'use strict';

  var root = this;

  root.define([
    'controllers/main'
    ],
    function(Main) {

      describe('Main Controller', function () {

        it('should be an instance of Main Controller', function () {
          var main = new Main();
          main.should.be.an.instanceof(Main);
        });

      });

    });

}).call( this );

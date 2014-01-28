(function() {
  'use strict';

  var root = this;

  root.define([
    'routers/main'
    ],
    function(Main) {

      describe('Main Router', function () {

        it('should be an instance of Main Router', function () {
          var main = new Main();
          main.should.be.an.instanceof(Main);
        });

      });

    });

}).call(this);

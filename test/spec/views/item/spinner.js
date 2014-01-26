(function() {
  'use strict';

  var root = this;

  root.define([
    'views/item/spinner'
    ],
    function( Spinner ) {

      describe('Spinner Itemview', function () {

        it('should be an instance of Spinner ItemView', function () {
          var spinner = new Spinner();
          spinner.should.be.an.instanceof(Spinner);
        });

      });

    });

}).call( this );

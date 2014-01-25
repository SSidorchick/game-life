(function() {
  'use strict';

  var root = this;

  root.define([
    'jquery',
    'views/collection/field',
    'collections/field'
    ],
    function($, Field, Collection) {

      describe('Field CollectionView', function () {

        it('should be an instance of Field CollectionView', function () {
          var field = new Field();
          field.should.be.an.instanceof(Field);
        });

        it('should toggle Cell Model alive state by click', function () {
          var collection = new Collection(null, { height: 10, width: 10 });
          var field = new Field({ collection: collection });
          field.render();

          field._clickCell(13, 12);
          collection.at(11).get('isAlive').should.be.true;

          field._clickCell(13, 12);
          collection.at(11).get('isAlive').should.be.false;

          field._clickCell(0, 0);
          collection.at(0).get('isAlive').should.be.true;

          field._clickCell(100, 100);
          collection.at(99).get('isAlive').should.be.true;
        });

      });

    });

}).call( this );

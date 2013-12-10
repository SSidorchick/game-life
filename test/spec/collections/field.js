(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/field'
		],
		function(Field) {

			describe('Field Collection', function () {

				it('should be an instance of Field Collection', function () {
					var field = new Field(null, { height: 3, width: 3 });
					field.should.be.an.instanceof(Field);
				});

        it('should have proper number of childern', function() {
          var field = new Field(null, { height: 3, width: 3 });
          field.length.should.equal(9);
        });

        var checkNeighboursCount = function(field, itemIndex, neighboursCount) {
          field.at(itemIndex).get('neighbours').should.have.length(neighboursCount);
        };

        it('each collection item should have proper number of neighbours', function() {
          var field = new Field(null, { height: 3, width: 3 });
          checkNeighboursCount(field, 0, 3);
          checkNeighboursCount(field, 1, 5);
          checkNeighboursCount(field, 2, 3);
          checkNeighboursCount(field, 3, 5);
          checkNeighboursCount(field, 4, 8);
          checkNeighboursCount(field, 5, 5);
          checkNeighboursCount(field, 6, 3);
          checkNeighboursCount(field, 7, 5);
          checkNeighboursCount(field, 8, 3);
        });

        var checkNeighbours = function(field, itemIndex, neighboursIndexies) {
          var neighbours = field.at(itemIndex).get('neighbours');
          neighbours.should.not.include(field.at(itemIndex));

          var items = [];
          for (var i = 0; i < neighboursIndexies.length; i++) {
            items.push(field.at(neighboursIndexies[i]));
          }
          neighbours.should.have.members(items);
        };

        it('each collection should have proper neighbours', function() {
          var field = new Field(null, { height: 3, width: 3 });
          checkNeighbours(field, 0, [1, 3, 4]);
          checkNeighbours(field, 1, [0, 2, 3, 4, 5]);
          checkNeighbours(field, 2, [1, 4, 5]);
          checkNeighbours(field, 3, [0, 1, 4, 6, 7]);
          checkNeighbours(field, 4, [0, 1, 2, 3, 5, 6, 7, 8]);
          checkNeighbours(field, 5, [1, 2, 4, 7, 8]);
          checkNeighbours(field, 6, [3, 4, 7]);
          checkNeighbours(field, 7, [3, 4, 5, 6, 8]);
          checkNeighbours(field, 8, [4, 5, 7]);
        });

			});

		});

}).call( this );

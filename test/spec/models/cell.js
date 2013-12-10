(function() {
	'use strict';

	var root = this;

	root.define([
		'models/cell'
		],
		function(Cell) {

			describe('Cell Model', function () {

				it('should be an instance of Cell Model', function () {
					var cell = new Cell();
					cell.should.be.an.instanceof(Cell);
				});

        it('should toggle alive property', function() {
          var cell = new Cell();
          cell.get('isAlive').should.be.false;
          cell.toggleAlive();
          cell.get('isAlive').should.be.true;
          cell.toggleAlive();
          cell.get('isAlive').should.be.false;
        });

        var checkNextState = function(initialState, neighboursCount, aliveNeighboursCount, nextState) {
          var cell = new Cell();
          cell.set('isAlive', initialState);

          var neighbours = [];
          for (var i = 0; i < neighboursCount; i++) {
            var neighbour = new Cell();
            if (aliveNeighboursCount > 0) {
              neighbour.set('isAlive', true);
              aliveNeighboursCount -= 1;
            }
            neighbours.push(neighbour);
          }
          cell.set('neighbours', neighbours);

          cell.generateNextState();

          cell.nextState.should.be.equal(nextState);
        };

        it('should generate next step based on neighbours', function() {
          checkNextState(true, 3, 0, false);
          checkNextState(true, 3, 1, false);
          checkNextState(true, 3, 2, true);
          checkNextState(true, 3, 3, true);

          checkNextState(true, 5, 0, false);
          checkNextState(true, 5, 1, false);
          checkNextState(true, 5, 2, true);
          checkNextState(true, 5, 3, true);
          checkNextState(true, 5, 4, false);
          checkNextState(true, 5, 5, false);

          checkNextState(true, 8, 0, false);
          checkNextState(true, 8, 1, false);
          checkNextState(true, 8, 2, true);
          checkNextState(true, 8, 3, true);
          checkNextState(true, 8, 4, false);
          checkNextState(true, 8, 8, false);
        });

        it('should switch to the next state', function() {
          var cell = new Cell();

          cell.nextState = false;
          cell.switchNextState();
          cell.get('isAlive').should.be.false;

          cell.nextState = true;
          cell.switchNextState();
          cell.get('isAlive').should.be.true;
        });

			});

		});

}).call( this );

(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/cell',
    'models/cell'
		],
		function( CellView, CellModel ) {

			describe('Cell ItemView', function () {
        beforeEach(function() {
          root.model = new CellModel();
          root.cell = new CellView({ model: root.model });
          root.cell.render();
        });

        afterEach(function() {
          delete root.cell;
          delete root.model;
        });

				it('should be an instance of Cell Itemview', function () {
					root.cell.should.be.an.instanceof(CellView);
				});

        it('should render default layout', function() {
          root.cell.$el.html().should.equal('');
        });

        it('should add/remove alive class when model isAlive property changed', function() {
          root.cell.$el.hasClass('alive').should.be.false;
          root.model.set('isAlive', true);
          root.cell.$el.hasClass('alive').should.be.true;
          root.model.set('isAlive', false);
          root.cell.$el.hasClass('alive').should.be.false;
        });

			});

		});

}).call( this );

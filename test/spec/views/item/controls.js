(function() {
  'use strict';

  var root = this;

  root.define([
    'views/item/controls',
    'models/controls',
    'collections/field'
    ],
    function(Controls, ControlsModel, FieldModel) {

      describe('Controls ItemView', function () {
        beforeEach(function() {
          var field = new FieldModel(null, { height: 10, width: 10 });
          root.model = new ControlsModel();
          root.model.setField(field);
          root.view = new Controls({ model: root.model });
          root.view.render();

          // Setup spies.
          sinon.spy(root.model, 'trigger');
          sinon.spy(root.model, 'increaseSpeed');
          sinon.spy(root.model, 'decreaseSpeed');
        });

        afterEach(function() {
          // Restore original methods.
          root.model.trigger.restore();
          root.model.increaseSpeed.restore();
          root.model.decreaseSpeed.restore();
        });

        it('should be an instance of Controls Itemview', function () {
          var controls = new Controls({ model: root.model });
          controls.should.be.an.instanceof(Controls);
        });

        it('should toggle Controls Model run pause', function () {
          var running = root.model.get('running');

          root.view.$el.find('#run').trigger('click');
          expect(root.model.get('running')).to.eql(!running);

          root.view.$el.find('#run').trigger('click');
          expect(root.model.get('running')).to.eql(running);
        });

        it('should trigger Controls Model step-forward event', function() {
          root.view.$el.find('#step-forward').trigger('click');
          expect(root.model.trigger.calledOnce).to.be.true;
          root.model.trigger.getCall(0).args[0].should.eql('action:step-forward');
        });

        it('should call increaseSpeed method on Controls Model', function() {
          root.view.$el.find('#increase-speed').trigger('click');
          expect(root.model.increaseSpeed.calledOnce).to.be.true;
        });

        it('should call dicreaseSpeed method on Controls Model', function() {
          root.view.$el.find('#decrease-speed').trigger('click');
          expect(root.model.decreaseSpeed.calledOnce).to.be.true;
        });

      });

    });

}).call( this );

import QUnit from 'steal-qunit';
import { ViewModel } from './modal';

// ViewModel unit tests
QUnit.module('tabletop/component/modal');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the tabletop-modal component');
});

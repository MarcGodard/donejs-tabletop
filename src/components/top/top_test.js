import QUnit from 'steal-qunit';
import { ViewModel } from './top';

// ViewModel unit tests
QUnit.module('tabletop/component/top');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the tabletop-top component');
});

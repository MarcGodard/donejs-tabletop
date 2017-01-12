import F from 'funcunit';
import QUnit from 'steal-qunit';

F.attach(QUnit);

QUnit.module('tabletop functional smoke test', {
  beforeEach() {
    F.open('../development.html');
  }
});

QUnit.test('tabletop main page shows up', function() {
  F('title').text('tabletop', 'Title is set');
});

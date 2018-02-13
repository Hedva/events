'use strict';

var common = require('./common');
var EventEmitter = require('../');
var assert = require('assert');

if (typeof Symbol !== 'undefined') {
  var ee = new EventEmitter();
  var foo = Symbol('foo');
  var listener = common.mustCall();

  ee.on(foo, listener);
  assert.deepStrictEqual(ee.listeners(foo), [listener]);

  ee.emit(foo);

  ee.removeAllListeners();
  assert.deepStrictEqual(ee.listeners(foo), []);

  ee.on(foo, listener);
  assert.deepStrictEqual(ee.listeners(foo), [listener]);

  ee.removeListener(foo, listener);
  assert.deepStrictEqual(ee.listeners(foo), []);
}

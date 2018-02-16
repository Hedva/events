'use strict';

var common = require('./common');
var EventEmitter = require('../');
var assert = require('assert');

var myEE = new EventEmitter();
var m = 0;
// This one comes last.
myEE.on('foo', common.mustCall(function() {
  assert.strictEqual(m, 2);
}));

// This one comes second.
myEE.prependListener('foo', common.mustCall(function() {
  assert.strictEqual(m++, 1);
}));

// This one comes first.
myEE.prependOnceListener('foo', common.mustCall(function() {
  assert.strictEqual(m++, 0);
}));

myEE.emit('foo');

// Verify that the listener must be a function
var errored = false;
try {
  var ee = new EventEmitter();

  ee.prependOnceListener('foo', null);
} catch (err) {
  errored = true;
  assert(err instanceof TypeError);
  assert.equal(err.message, '"listener" argument must be a function');
}
assert.ok(errored);

// Test fallback if prependListener is undefined.
var stream = require('stream');
var util = require('util');

var prependListener = EventEmitter.prototype.prependListener;
delete EventEmitter.prototype.prependListener;

function Writable() {
  this.writable = true;
  stream.Stream.call(this);
}
util.inherits(Writable, stream.Stream);

function Readable() {
  this.readable = true;
  stream.Stream.call(this);
}
util.inherits(Readable, stream.Stream);

var w = new Writable();
var r = new Readable();
r.pipe(w);

EventEmitter.prototype.prependListener = prependListener;

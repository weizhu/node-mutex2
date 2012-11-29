var Sync = require('sync');
var util = require('util');
var mutex = require('./lib/mutex');

function SyncMutex() {
  SyncMutex.super_.call(this);
}

util.inherits(SyncMutex, mutex.Mutex);

SyncMutex.prototype.lock = function() {
  var fiber = Fiber.current;
  mutex.Mutex.prototype.lock.sync(this, fiber);
}.async();


exports.SyncMutex = SyncMutex;

var Sync = require('sync');
var mutex = require('mutex2/sync');


exports.testBasic = function(test) {
  test.expect(1);
  var m = new mutex.SyncMutex();
  Sync(function() {
    m.lock();
    m.free();
    test.ok(true, 'should reach here');
  });
  test.done();
}


exports.testLockTwice = function(test) {
  test.expect(4);
  var m = new mutex.SyncMutex();
  
  Sync(function() {
    m.lock();
    test.ok(true, 'first lock');
    m.lock();
    test.ok(true, 'second lock');
    m.free();
    test.ok(true, 'first free');
    m.free();
    test.ok(true, 'second free');
  });

  test.done();
}


exports.testLockTwice = function(test) {
  test.expect(4);
  var m = new mutex.SyncMutex();
  
  Sync(function() {
    m.lock();
    test.ok(true, 'first lock');
    m.lock();
    test.ok(true, 'second lock');
    m.free();
    test.ok(true, 'first free');
    m.free();
    test.ok(true, 'second free');
  });

  test.done();
}

exports.testLockSequence = function(test) {
  var m = new mutex.SyncMutex();
  var s = 'step: ';
  
  Sync(function() {
    Sync.sleep(100);
    m.lock();
    s += '3';
    m.free();
    test.equal(s, 'step: 123', 'lock sequence is wrong');
    test.done();
  });

  s += '1';
  Sync(function() {
    m.lock();
    Sync.sleep(200);
    s += '2';
    m.free();
  });
}


exports.testTooManyRelease = function(test) {
  var m = new mutex.SyncMutex();
  
  Sync(function() {
    m.lock();
    m.free();
    test.throws(function() {
      m.free();
    });
    test.done();
  });
}

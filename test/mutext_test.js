var mutex = require('mutex2');

exports.testBasic = function(test) {
  test.expect(1);
  var m = new mutex.Mutex();
  m.lock(null, function() {
    m.free();
    test.ok(true, 'should reach here');
    test.done();
  });
}

exports.testLockTwice = function(test) {
  test.expect(4);
  var m = new mutex.Mutex();
  m.lock('a', function() {
    test.ok(true, 'first lock');
    m.lock('a', function() {
      test.ok(true, 'second lock');
      m.free();
      test.ok(true, 'first free');
      m.free();
      test.ok(true, 'second free');
      test.done();
    })
  });
}

exports.testLockSequence = function(test) {
  var m = new mutex.Mutex();
  var s = 'step: ';
  
  setTimeout(function() {
    m.lock('a', function() {
      s += '3';
      m.free();
      test.equal(s, 'step: 123', 'lock sequence is wrong');
      test.done();
    });
  }, 100);

  s += '1';
  m.lock('b', function() {
    setTimeout(function() {
      s += '2';
      m.free();
    }, 200);
  });
}

exports.testTooManyRelease = function(test) {
  var m = new mutex.Mutex();
  
  m.lock('a', function() {
    m.free();
    test.throws(function() {
      m.free();
    });
    test.done();
  });
}
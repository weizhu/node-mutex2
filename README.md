mutex2
===========

A simple mutex class for Node JS. This can be useful for writting resource sharing code in node.js. It also designed to work with node-sync module nicely.

Even though Nodes run inside a single threaded environment, there is still a need to use a mutex locking mechanism for sharing resources when your have asynchronous codes.

Samples when used with node-sync module
-----------
```javascript

var m = new mutex.SyncMutex();
Sync(function() {
  m.lock();
  console.log('do task');
  m.free();
});
```


```javascript
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
```

Samples without using node-sync module
-----------

```javascript
  var m = new mutex.Mutex();
  m.lock(null, function() {
    console.log('do task');
    m.free();
  });

```

```javascript
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
```


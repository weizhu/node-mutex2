function Mutex() {
  this.queue = [];
  this.count = 0;
}

function MutexException(msg) {
  this.message = msg;
}

Mutex.prototype.lock = function(owner, cb) {
  if (this.count === 0 || (this.currentOwner && this.currentOwner === owner)) {
    this.currentOwner = owner;
    this.count++;
    cb(null, null);
  } else {
    this.queue.push({owner: owner, cb: cb});
  } 
}

Mutex.prototype.free = function() {
  this.count--;
  if (this.count === 0) {
    this.currentOwner = undefined;
    var next = this.queue.shift();
    if (next) {
      this.lock(next.owner, next.cb);
    }
  } else if (this.count < 0) {
    throw new MutexException('mutex is already released');
  }
}


exports.Mutex = Mutex;
exports.MutexException = MutexException;

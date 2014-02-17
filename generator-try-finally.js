
var POWER2 = 20;

var inspect = require('util').inspect;

console.log("Allocationg " + (1<<POWER2) + " bytes every as soon as setInterval(.., 0) can");
global.gc();
console.log("Starting with:", process.memoryUsage());


function* helloGenerator() {
  try {
    var x;
    var b = new Buffer(1<<POWER2);
    yield x=1;
    for (var i = 0; i < (1<<POWER2); i++) {
      b[i] = i;
    }
    yield x=2;
    yield x=3;
    yield x=4;
  } catch (e) {
    process.stdout.write("\nError: " + e + " at " + x);
  } finally {
    process.stdout.write("\nFinnaly: at " + x);
  }
}

var intervalA = setInterval(function() {
  var hello = helloGenerator();
  process.stdout.write('.');
  hello.next();
  hello.next();
}, 0);

var intervalB = setInterval(function() {
  var hello = helloGenerator();
  hello.next();
  hello.next();
  hello.next();
  hello.next();
  hello.next();
}, 1000);

var intervalC = setInterval(function() {
  var hello = helloGenerator();
  hello.next();
  hello.next();
  hello.throw(new Error('Interrupt'));
}, 666);

var intervalD = setInterval(function() {
  var before = process.memoryUsage();
  global.gc();
  var after = process.memoryUsage()
  console.log("\n", before, after);
}, 100);

setTimeout(function () {
  clearInterval(intervalA);
  clearInterval(intervalB);
  clearInterval(intervalC);
}, 10000);


setTimeout(function () {
  clearInterval(intervalD);
  console.log('Should now terminate');
}, 6000);

setTimeout(function() {
  var before = process.memoryUsage();
  global.gc();
  var after = process.memoryUsage()
  console.log("\n", before, after);
}, 11000);

function* helloGenerator() {
  yield "Ahoj";
  yield "generátore!";
}

var hello = helloGenerator();

console.log(hello.next()); // { value: 'Ahoj', done: false }
console.log(hello.next()); // { value: 'generátore!', done: false }
console.log(hello.next()); // { value: undefined, done: true }
// console.log(hello.next()); // throws Error: Generator has already finished
function* fibonacciGenerator() {
    var fib, prev = 0, curr = 1;
    while(true) {
        fib = prev + curr;
        prev = curr;
        yield curr = fib;
    }
}

var fibonacci = fibonacciGenerator();

console.log(fibonacci.next()); // { value: 1, done: false }
console.log(fibonacci.next()); // { value: 2, done: false }
console.log(fibonacci.next()); // { value: 3, done: false }
console.log(fibonacci.next()); // { value: 5, done: false }
console.log(fibonacci.next()); // { value: 8, done: false }

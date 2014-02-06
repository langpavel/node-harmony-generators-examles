function* sequenceGenerator(start, increment, max) {
    while (start < max) {
        yield start;
        start += increment;
    }
}

function* composedGenerator() {
    // yield s hvezdičkou vrací celý generátor
    yield* sequenceGenerator(0, 2, 10);
    yield* sequenceGenerator(10, 20, 100);
    yield* sequenceGenerator(100, 200, 1000);
}

var sequence = composedGenerator();

while (true) {
    var item = sequence.next();
    if (item.done) return;
    console.log(item.value);
}
// vypíše 0 2 4 6 8 10 30 50 70 90 100 300 500 700 900
function* zlobivyGenerator() {
    var i = 0;
    try {
        while (true) yield i++;
    } catch (err) {
        console.log('Ouha ' + err);
        while (i--) yield i;
    }
}

var generator = zlobivyGenerator();

console.log(generator.next()); // { value: 0, done: false }
console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
generator.throw(new Error("Chyba")); // Ouha Error: Chyba
console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 0, done: false }
console.log(generator.next()); // { value: undefined, done: true }
function* zvedavyGenerator() {
    var result = yield 'Kdo jsem?';
    return result === 'Generátor' ? 'Ano! :-)' : 'Ne!';
}

var otazky = zvedavyGenerator();

// Předávat hodnotu prvnímu volání next() nemá smysl
console.log(otazky.next());            // { value: 'Kdo jsem?', done: false }
console.log(otazky.next("Generátor")); // { value: 'Ano! :-)', done: true }

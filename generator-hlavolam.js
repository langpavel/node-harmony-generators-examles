
var events = [];

function* testovaciGenerator(vychozi) {
    events.push('testovaciGenerator');
    var aktualni, predchozi = vychozi;
    while (true) {
        events.push('GEN pred yeldem: ' + predchozi);
        aktualni = yield predchozi;
        events.push('GEN za yeldem: ' + aktualni);
        predchozi = aktualni;
    }
}

var zpozdovac = testovaciGenerator('výchozí');

// Vytvořen
events.push('Vytvořen');

// testovaciGenerator
// GEN pred yeldem: výchozí
var a = zpozdovac.next('první next(hodnota) se nemá kam předat').value;

// výchozí
events.push(a);

// (1)
events.push('(1)');

// GEN za yeldem: druhy
// GEN pred yeldem: druhy
var b = zpozdovac.next('druhá').value;

// druhy
events.push(b);

// (2)
events.push('(2)');

// GEN za yeldem: třetí
// GEN pred yeldem: třetí
var c = zpozdovac.next('třetí').value;

// třetí
events.push(c);

console.log(events);

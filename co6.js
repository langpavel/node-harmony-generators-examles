var fs = require('fs');
var co = require('co');
var thunkify = require('thunkify');

// názorně zobrazuje na konzoli kdy se čeká...
var heartbeat = setInterval(function() { console.log('.') }, 240);

co(function *() {
    var results = yield {
        'jmeno': print('jmeno'),
        'prijmeni': print('prijmeni'),
        'id': yield print('id'),
        'konstanta5': 5,
        'konstantaStr': 'konstantaStr',
        'pole': [
            print('pole[0]'),
            print('pole[1]'),
            [
                print('pole[2][0]'),
                [
                    print('pole[2][1][0]'),
                    print('pole[2][1][1]'),
                ],
                {
                    'pozdni': print('pole[2][2].pozdni'),
                    'drivejsi': yield print('pole[2][2].drivejsi')
                },
                print('pole[2][3]'),
            ],
            print('pole[3]'),
        ],
    };
    console.log(JSON.stringify(results, null, 2));
})(function() {
  clearInterval(heartbeat);
});

function print(name) {
    return function(callback) {
        console.log('Zpracovávám ' + name);
        setTimeout(function() {
            callback(null, 'hodnota ' + name);
        }, 500 + Math.random() * 1000);
    };
}

// Zpracovávám id
// ... čeká
// Zpracovávám pole[2][2].drivejsi
// ... čeká
// Zpracovávám jmeno
// Zpracovávám prijmeni
// Zpracovávám pole[0]
// Zpracovávám pole[1]
// Zpracovávám pole[2][0]
// Zpracovávám pole[2][1][0]
// Zpracovávám pole[2][1][1]
// Zpracovávám pole[2][2].pozdni
// Zpracovávám pole[2][3]
// Zpracovávám pole[3]
// ... čeká
({
  "id": "hodnota id",
  "konstanta5": 5,
  "konstantaStr": "konstantaStr",
  "prijmeni": "hodnota prijmeni",
  "jmeno": "hodnota jmeno",
  "pole": [
    "hodnota pole[0]",
    "hodnota pole[1]",
    [
      "hodnota pole[2][0]",
      [
        "hodnota pole[2][1][0]",
        "hodnota pole[2][1][1]"
      ],
      {
        "drivejsi": "hodnota pole[2][2].drivejsi",
        "pozdni": "hodnota pole[2][2].pozdni"
      },
      "hodnota pole[2][3]"
    ],
    "hodnota pole[3]"
  ]
});

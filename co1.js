var fs = require('fs');
var co = require('co');
var thunkify = require('thunkify');

var read = thunkify(fs.readFile);

// toto je náš aplikační kód
co(function *() {
    var lines = [];
    for (var i = 1; i <= 6; i++) {
        var filename = './generator' + i + '.js';
        lines.push('File: ' + filename);
        lines.push(yield read(filename, { encoding: 'utf-8' }));
        lines.push('========================');
    }
    console.log(lines.join('\n'));
})();

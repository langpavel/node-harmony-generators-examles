
var fs = require('fs');

// toto je náš aplikační kód
function *taskGenerator() {
    var lines = [];
    for (var i = 1; i <= 6; i++) {
        var filename = './generator' + i + '.js';
        lines.push('File: ' + filename);
        lines.push(yield readFileThunk(filename, { encoding: 'utf-8' }));
        lines.push('========================');
    }
    console.log(lines.join('\n'));
}


// co je "thunk" si popíšeme dále v textu
function readFileThunk(filename, options) {
    return function(callback) {
        fs.readFile(filename, options, callback);
    }
}


// toto teď moc nestudujte, není to až tak třeba
// popíšeme si lepší způsob, jak docílit téhož
function procesTasks(tasks, callback, value) {
    var task = tasks.next(value);
    if (typeof task.value === 'function') {
        task.value(function(err, result) {
            procesTasks(tasks, callback, result);
        })
    } else {
        if (typeof callback === 'function')
            callback(new Error('Unsupported return value'));
    }
}


// a teprve teď to celé zpracujeme
procesTasks(taskGenerator());

var fs = require('fs');
var co = require('co');
var thunkify = require('thunkify');

var read = thunkify(fs.readFile);

// toto je náš aplikační kód
co(function *() {
    return (yield read('./generator1.js', { encoding: 'utf-8' })) +
        (yield read('./generator2.js', { encoding: 'utf-8' }));
})(function(err, result) {
    console.log(result);
});

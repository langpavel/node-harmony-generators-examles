var fs = require('fs');
var co = require('co');
var thunkify = require('thunkify');

var read = thunkify(fs.readFile);

co(function *() {
    var results = yield [
        read('./co1.js', { encoding: 'utf8'}),
        read('./co2.js', { encoding: 'utf8'}),
        read('./co3.js', { encoding: 'utf8'})];
    console.log(results.join('\n===\n'));
})();

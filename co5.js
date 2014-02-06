var fs = require('fs');
var co = require('co');
var thunkify = require('thunkify');

var read = thunkify(fs.readFile);

co(function *() {
    var results = yield {
        'co1': read('./co1.js', { encoding: 'utf8'}),
        'co2': read('./co2.js', { encoding: 'utf8'}),
        'co3': read('./co3.js', { encoding: 'utf8'})}
    console.log(results);
})();

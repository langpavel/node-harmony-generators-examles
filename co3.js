var fs = require('fs');
var co = require('co');
var thunkify = require('thunkify');

var read = thunkify(fs.readFile);

co(function *() {
    try {
        return (yield read('./generator1.js', { encoding: 'utf-8' })) +
            (yield read('./generator2.js', { encoding: 'utf-8' })) +
            (yield read('neexistujici-soubor', { encoding: 'utf-8' }));
    } catch (err) {
        throw new Error('Něco je špatně: ' + err.message);
    }
})(function(err, result) {
    if (err) {
        console.error('Chyba: ' + err.message);
        // Chyba: Něco je špatně: ENOENT, open 'neexistujici-soubor'
        return;
    }
    console.log(result);
});

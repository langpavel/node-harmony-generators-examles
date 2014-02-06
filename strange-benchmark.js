
var iteraci = 1e6;

// toto je náš aplikační kód
function *taskGenerator() {
    var time = process.hrtime();
    for (var i = 1; i <= iteraci; i++) {
        yield immediateThunk(0);
    }
    var diff = process.hrtime(time);
    console.log(iteraci + ' asynchronních iterací trvá ' + (diff[0] + diff[1] / 1e9) + 's');
}

function syncTaskItem(a, b, c) {
    return c > 0 ? syncTaskItem(a + b, a + b, c - 1) : a + b;
}

function syncTask() {
    var time = process.hrtime();
    var x = 0;
    for (var i = 1; i <= iteraci; i++) {
        x += syncTaskItem(1, 1, 20);
    }
    var diff = process.hrtime(time);
    console.log(iteraci + ' synchronních iterací trvá ' + (diff[0] + diff[1] / 1e9) + 's, x = ' + x);
}

syncTask();

function immediateThunk() {
    return function(callback) {
        setImmediate(function() {
            callback();
        });
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

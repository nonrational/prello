/* jshint node: true */
'use strict';

var index = require('./index.js'),
    fs = require('fs');

fs.readFile('./spec/fixtures/reopen_pr.json', 'utf8', function(e,data){
    index.handler(JSON.parse(data), {
        succeed: function(s){
            console.error(s);
            process.exit(0);
        },
        fail: function(s){
            console.error(s);
            process.exit(1);
        }
    });
});

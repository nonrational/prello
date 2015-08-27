'use strict';

var index = require('./index.js');

index.handler({
  "owner": "nonrational",
  "repo": "prello",
  "number": 2,
  "message": "[prello] says _hello again_ from %s"
}, {
    succeed: function(s){
        console.log(s);
    }
});

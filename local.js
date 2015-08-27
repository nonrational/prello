'use strict';

var index = require('./index.js');

index.handler({
  "owner": "nonrational",
  "repo": "prello",
  "number": 2,
  "message": "[prello @ " + new Date() + "]\n\n_hello again_ from %s"
}, {
    succeed: function(s){ }
});

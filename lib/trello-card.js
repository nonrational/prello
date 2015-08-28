/* jshint node: true */
'use strict';

var Trello = require('node-trello'),
    nconf = require('nconf'),
    util = require('util');

nconf.env().file({ file: 'config.json'});

var TrelloCard = module.exports = function(id){
    this.id = id;
    this.url = "https://trello.com/c/" + this.id;
    this.t = new Trello(nconf.get("TRELLO_KEY"), nconf.get("TRELLO_SECRET"));
    this.config = nconf;
};

TrelloCard.prototype.comment = function(comment_text, callback){
    var comment_url = util.format("/1/cards/%s/actions/comments", this.id);

    this.t.post(comment_url, { text: comment_text }, function(e,d){
        callback(e,d);
    });
};

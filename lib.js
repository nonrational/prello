'use strict';

var Trello = require('node-trello'),
    nconf = require('nconf'),
    util = require('util');

nconf.file({ file: 'config.json'})

function TrelloCard(id){
    this.id = id;
    this.url = "https://trello.com/c/" + this.id;
    this.conn = new Trello(nconf.get("TRELLO_KEY"), nconf.get("TRELLO_SECRET"));
}

TrelloCard.prototype.comment = function(comment_text){
    var comment_url = util.format("/1/cards/%s/actions/comments", this.id);

    console.log("comment_url=", comment_url);
    console.log(comment_text);

    this.conn.post(comment_url, { text: comment_text }, function(e,d){
        e&&console.error(e);
        d&&console.log(d);
    });
}

TrelloCard.prototype.find_comment = function(comment_text){
    var comment_url = util.format("/1/cards/%s/actions/comments", this.id);
    this.conn.post(comment_url, { text: comment_text }, function(e,d){
        e&&console.error(e);
        d&&console.log(d);
    });
}

exports.TrelloCard = TrelloCard;
exports.config = nconf;

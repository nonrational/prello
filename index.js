'use strict';

var request = require('request'),
    util = require('util'),
    lib = require('./lib.js');

function extract_card_id(text){
    var card_url = /https?:\/\/(www\.)?trello\.com\/c\/([^\/]+)/gi.exec(text);
    return card_url ? card_url[2] : undefined;
}

console.dir = console.log;

exports.handler = function(event, context) {

    var options = {
        url: util.format("https://api.github.com/repos/%s/%s/pulls/%s", event.owner, event.repo, event.number),
        headers: {
          'User-Agent': 'request (https://github.com/nonrational/prello)'
        }
    };

    request(options, function(error, response, body){
        var pr = JSON.parse(body);
        var card = new lib.TrelloCard(extract_card_id(pr.body));

        card.comment(util.format(event.message, pr.html_url), function(e,d){
            e&&context.fail(e)
            d&&context.succeed(d);
        })
    })
};

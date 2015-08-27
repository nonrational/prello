'use strict';

var rest = require('restler'),
    util = require('util'),
    lib = require('./lib.js');

function extract_card_id(text){
    var card_url = /https?:\/\/(www\.)?trello\.com\/c\/([^\/]+)/gi.exec(text);
    return card_url ? card_url[2] : undefined;
}

exports.handler = function(event, context) {
    var pr_url = util.format("https://api.github.com/repos/%s/%s/pulls/%s", event.owner, event.repo, event.number);

    rest.get(pr_url).on('complete', function(pr){
        var card = new lib.TrelloCard(extract_card_id(pr.body));
        card.comment(util.format(event.message, pr.html_url))
        context.succeed(card.url);
    })
};

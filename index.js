'use strict';

var request = require('request'),
    util = require('util'),
    lib = require('./lib.js');

function extract_card_id(text){
    var card_url = /https?:\/\/(www\.)?trello\.com\/c\/([^\/]+)/gi.exec(text);
    return card_url ? card_url[2] : undefined;
}

exports.handler = function(event, context) {

    var ghpr = event;

    if(!ghpr.pull_request){
        context.fail({"error":"event is not a 'pull_request'"});
    }

    var pr_url = ghpr.pull_request.html_url,
        pr_body = ghpr.pull_request.body,
        message = ":information_desk_person: %s",
        mentioned_trello_card_id = extract_card_id(pr_body);

    if(mentioned_trello_card_id){
        var card = new lib.TrelloCard(mentioned_trello_card_id);
        card.comment(util.format(message, pr_url), function(e,d){
            e&&context.fail(e)
            d&&context.succeed(d);
        })
    } else {
        context.fail({"error":"no trello card found"});
    }
};

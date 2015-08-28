/* jshint node: true */
'use strict';

var request = require('request'),
    util = require('util'),
    TrelloCard = require('./trello-card');

module.exports.handler = function(event, context) {

    var ghpr = event;

    if(!ghpr.pull_request){
        context.fail("event is not a 'pull_request'");
    }

    function extract_card_id(text){
        var card_url = /https?:\/\/(www\.)?trello\.com\/c\/([^\/]+)/gi.exec(text);
        return card_url ? card_url[2] : undefined;
    }

    var pr_url = ghpr.pull_request.html_url,
        pr_body = ghpr.pull_request.body,
        message = ":link: %s",
        mentioned_trello_card_id = extract_card_id(pr_body);

    if(mentioned_trello_card_id){

        var card = new TrelloCard(mentioned_trello_card_id),
            comment_text = util.format(message, pr_url);

        card.comment_once(util.format(message, pr_url),
            function(e,d){
                if(e) context.fail(e);
                if(d) context.succeed(d);
            });

    } else {
        context.fail(util.format("no trello card referenced on %s", ghpr.pull_request.html_url));
    }
};

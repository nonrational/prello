var rest = require('restler'),
util = require('util'),
nconf = require('nconf').env(),
Trello = require('node-trello');

// pr_details = {
//     "owner":  "nonrational",
//     "repo":   "prello",
//     "number": 2
// }

function TrelloCard(id){
    this.id = id;
    this.url = "https://trello.com/c/" + this.id;
    this.conn = new Trello(nconf.get("TRELLO_KEY"), nconf.get("TRELLO_SECRET"));
}

TrelloCard.prototype.comment = function(comment_text){
    var comment_url = util.format("/1/cards/%s/actions/comments", this.id);
    this.conn.post(comment_url, { text: comment_text }, function(e,d){ })
}

TrelloCard.prototype.find_comment = function(comment_text){
    var comment_url = util.format("/1/cards/%s/actions/comments", this.id);
    this.conn.post(comment_url, { text: comment_text }, function(e,d){ })
}


exports.handler = function(event, context) {
    var owner  = event.owner,
        repo   = event.repo,
        number = event.number;

    var pr = undefined;

    var pr_url=util.format("https://api.github.com/repos/%s/%s/pulls/%s", owner, repo, number);

    function extract_card_id(text){
        var card_url = /https?:\/\/(www\.)?trello\.com\/c\/([^\/]+)/gi.exec(text);
        if(card_url){
            return card_url[2];
        }
    }

    rest.get(pr_url).on('complete', function(r){
        pr = r;
        var card = new TrelloCard(extract_card_id(pr.body));
        card.comment(util.format("[prello] says _hello_ from %s", pr.html_url))
        console.succeed(card.url);
    })
};

var
  rest = require('restler'),
  util = require('util'),
  nconf = require('nconf').env(),
  Trello = require('node-trello');

var pr = undefined;

var owner = 'nonrational', repo = 'prello', number = 2;
var pr_url=util.format("https://api.github.com/repos/%s/%s/pulls/%s", owner, repo, number);
rest.get(pr_url)
  .on('complete', function(r){
    pr = r;
    var card = new TrelloCard(t, extract_card_id(pr.body));
    card.comment(util.format("[prello] says _hello_ from %s", pr.html_url))

    console.log(card.url);
  })

function extract_card_id(text){
  var card_url = /https?:\/\/(www\.)?trello\.com\/c\/([^\/]+)/gi.exec(text);
  if(card_url){
    return card_url[2];
  }
}

function TrelloCard(id){
  this.id = id;
  this.url = "https://trello.com/c/" + this.id;
  this.conn = new Trello(nconf.get("TRELLO_KEY"), nconf.get("TRELLO_SECRET");
}

TrelloCard.prototype.comment = function(comment_text){
  var comment_url = util.format("/1/cards/%s/actions/comments", this.id);
  this.conn.post(comment_url, { text: comment_text }, function(e,d){ })
}

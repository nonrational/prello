var
  rest = require('restler'),
  util = require('util'),
  nconf = require('nconf').env(),
  p = console.log,
  Trello = require('node-trello'),
  t = new Trello(nconf.get("TRELLO_KEY"), nconf.get("TRELLO_SECRET"));

var pr=undefined;

var owner = 'nonrational', repo = 'prello', number = 1;
var pr_url=util.format("https://api.github.com/repos/%s/%s/pulls/%s", owner, repo, number);
rest.get(pr_url)
  .on('complete', function(r){
    pr = r;
    process(pr.body);
  })

function process(body){
  var linked = /https?:\/\/(www\.)?trello\.com\/c\/([^\/]+)/gi.exec(body);

  if(linked){
    var card_id = linked[2];
    var comment_url = util.format("/1/cards/%s/actions/comments", card_id);

    var comment_text = util.format("[prello] says _hello_ from %s", pr.html_url);

    t.post(comment_url, { text: comment_text }, function(e,d){ });

  } else {
    console.err("trello link not found? probably no big deal.");
  }

}


/* jshint node: true */
// spec/calculator-spec.js

var fs = require('fs'),
    prello = require("../../lib/prello"),
    TrelloCard = require("../../lib/trello-card");

var pr_sans_trello = JSON.parse(fs.readFileSync('./spec/fixtures/pr_sans_trello.json', 'utf8').toString());
var pr_with_trello = JSON.parse(fs.readFileSync('./spec/fixtures/pr_with_trello.json', 'utf8').toString());
var non_pr_event   = JSON.parse(fs.readFileSync('./spec/fixtures/non_pr_event.json', 'utf8').toString());

var Context = function(done, status, message) {

    this.succeed = function(d){
        expect(status).toBe("success");
        // console.log(d);
        done(d);
    };

    this.fail = function(e){
        expect(status).toBe("failure");
        expect(e).toBe(message);
        done(e);
    };
};

describe("handler", function() {

    it("should fail when trello card already has a comment", function(done) {
        var context = new Context(done, "failure", "comment text already present");
        prello.handler(pr_with_trello, context);
    });

    it("should fail when no trello card referenced", function(done) {
        var context = new Context(done, "failure", "no trello card referenced on https://github.com/nonrational/prello/pull/2");
        prello.handler(pr_sans_trello, context);
    });

    it("should succeed on a blank card", function(done){
        var comment_id;

        var context = new Context(function(new_comment){
            new TrelloCard("XinwRYra").delete_comment(new_comment.id, done);
        }, "success");

        prello.handler({
          "pull_request": {
            "html_url": "xxxxxxxxx",
            "body": "https://trello.com/c/XinwRYra/4-test-card"
          }
        }, context);
    });

});

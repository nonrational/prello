/* jshint node: true */
// spec/calculator-spec.js

var fs = require('fs'),
    prello = require("../../lib/prello");

var pr_sans_trello = JSON.parse(fs.readFileSync('./spec/fixtures/pr_sans_trello.json', 'utf8').toString());
var pr_with_trello = JSON.parse(fs.readFileSync('./spec/fixtures/pr_with_trello.json', 'utf8').toString());
var non_pr_event   = JSON.parse(fs.readFileSync('./spec/fixtures/non_pr_event.json', 'utf8').toString());

var Context = function(){
    this.status = null;
    this.message = null;

    this.succeed = function(s){
        this.status = "success";
        this.message = s;
    };
    this.fail = function(e){
        this.status = "failure";
        this.message = e;
    };
};


describe("handler", function () {

    it("should fail when trello card already has a comment", function() {
        var ctx = new Context();

        runs(function(){
            prello.handler(pr_with_trello, ctx);
        });

        waitsFor(function(){
            return ctx.status === "failure" && ctx.message === "comment text already present";
        }, "status should be failure with text present", 1000);
    });

    it("should error when no trello card referenced", function() {
        // this works because there's no async call in this path
        var ctx = new Context();
        prello.handler(pr_sans_trello, ctx);
        expect(ctx.status).toBe("failure");
        expect(ctx.message).toBe("no trello card referenced on https://github.com/nonrational/prello/pull/2");
    });

});

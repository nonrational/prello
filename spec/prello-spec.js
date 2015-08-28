/* jshint node: true */
// spec/calculator-spec.js

var fs = require('fs'),
    prello = require("../lib/prello");

var Context = function(){

    this.status = null;
    this.succeed = function(s){
        console.error(s);
        this.status = "success";
    };
    this.fail = function(s){
        console.error(s);
        this.status = "failure";
    };
};

var pr_sans_trello = JSON.parse(fs.readFileSync('./spec/fixtures/pr_sans_trello.json', 'utf8').toString());

describe("handler", function () {

    it("should error when ", function () {
        var ctx = new Context();

        prello.handler(pr_sans_trello, ctx);

        expect(ctx.status).toBe("failure");
    });

});

/* jshint node: true */
// spec/calculator-spec.js
var TrelloCard = require("../../lib/trello-card");

describe("initializer", function () {

    it("should accept and store a card id", function () {
        var card = new TrelloCard("my_id");
        expect(card.id).toBe("my_id");
    });

    it("can comment and then delete that comment", function(done) {

        var card = new TrelloCard("XinwRYra");

        card.comment_once("test-comment", function(e){
            expect(e).toBe(null);
            card.delete_comment_like("test-comment", done);
        });

    });

});

/* jshint node: true */
// spec/calculator-spec.js
var TrelloCard = require("../lib/trello-card");

describe("initializer", function () {

    it("should accept and store a card id", function () {
        var card = new TrelloCard("my_id");
        expect(card.id).toBe("my_id");
    });

});

/**
 * Created by osbertngok on 3/3/2017.
 */

const Pile = require('../models/cards/pile');
const ShengjiUtils = require('../utils/shengjiUtils');

const isDominantCardsDeclarationValid = (potentialDeclaration, shengjiGameState, currentDeclaration) => {
    // potentialDeclaration must be a pile of at least 1 DeckedCards
    if (!potentialDeclaration || potentialDeclaration.prototype.constructor !== Pile) {
        return false;
    }

    if (!potentialDeclaration.deckedCards.length) {
        return false;
    }

    // Must be of the same suit / rank
    let suit = null;
    let rank = null;
    for (let cardIndex = 0; cardIndex < potentialDeclaration.deckedCards.length; cardIndex++) {
        const deckedCard = potentialDeclaration.deckedCards[cardIndex];
        if (suit === null && rank === null){
            suit = deckedCard.suit;
            rank = deckedCard.rank;
            continue;
        }

        if (suit !== deckedCard.suit) {
            return false;
        }

        if (rank !== deckedCard.rank) {
            return false;
        }
    }
    const firstDeckedCard = potentialDeclaration.deckedCards[0];
    if (!ShengjiUtils.predicates.isJoker(firstDeckedCard) &&
        !ShengjiUtils.predicates.isDominantRank(shengjiGameState, firstDeckedCard)) {
        return false;
    }

    const noOfDeckedCardsInCurrentDeclaration = currentDeclaration ? currentDeclaration.deckedCards.length : 0;

};

module.exports = {
    'isDominantCardsDeclarationValid': isDominantCardsDeclarationValid
}
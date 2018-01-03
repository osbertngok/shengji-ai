/**
 * Created by osbertngok on 2/3/2017.
 */
'use strict';
import {assert} from 'chai';

import {Suits} from '../../src/models/cards/card';
import {DeckedCard} from '../../src/models/cards/deckedCard';
import {Pile} from '../../src/models/cards/pile';
import * as PileUtils from '../../src/utils/pileUtils';

describe('Intersection Test', () => {
    it('1 intersection', () => {
        const pile1 = new Pile([
            new DeckedCard(1, Suits.Diamond, 12),
            new DeckedCard(2, Suits.Diamond, 1),
            new DeckedCard(2, Suits.Diamond, 4),
            new DeckedCard(2, Suits.Heart, 2),
            new DeckedCard(3, Suits.Spade, 2),
            new DeckedCard(1, Suits.Joker, 1),
            new DeckedCard(3, Suits.Spade, 5),
            new DeckedCard(1, Suits.Spade, 6),
            new DeckedCard(1, Suits.Club, 7),
            new DeckedCard(1, Suits.Club, 8),
            new DeckedCard(1, Suits.Heart, 9)
        ]);

        const pile2 = new Pile([
            new DeckedCard(2, Suits.Diamond, 12),
            new DeckedCard(2, Suits.Diamond, 1),
            new DeckedCard(3, Suits.Diamond, 4),
            new DeckedCard(3, Suits.Heart, 2),
            new DeckedCard(1, Suits.Spade, 2),
            new DeckedCard(2, Suits.Joker, 1),
            new DeckedCard(1, Suits.Spade, 5),
            new DeckedCard(2, Suits.Spade, 6),
            new DeckedCard(2, Suits.Club, 7),
            new DeckedCard(2, Suits.Club, 8),
            new DeckedCard(2, Suits.Heart, 9)
        ]);

        const intersectionPile = PileUtils.intersection(pile1, pile2);
        assert.strictEqual(1, intersectionPile.length);
        assert.strictEqual(new DeckedCard(2, Suits.Diamond, 1), intersectionPile.deckedCards[0]);
    });
});


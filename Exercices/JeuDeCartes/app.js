const myDeck = {
  deck: [],
  hand: [],
  discard: [],
  suits: ['♥', '♦', '♠', '♣'],
  values: 'A,1,2,3,4,5,6,7,8,9,10,J,Q,K'.split(','),

  createDeck() {
    const { suits, deck, values, hand } = this;
    deck.length = 0;
    hand.length = 0;
    values.forEach(value => {
      suits.forEach(suit => {
        deck.push({ value, suit });
      });
    });
    this.shuffleDeck();
  },
  draw() {
    const card = this.deck.pop();
    this.hand.push(card);
    return card;
  },

  drawMultiple(qte) {
    for (let i = 0; i < qte; i++) {
      this.draw();
    }
  },

  shuffleDeck() {
    const { deck } = this;
    for (let i = deck.length - 1; i > 0; i--) {
      const randoIdx = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[randoIdx]] = [deck[randoIdx], deck[i]];
    }
  },
};

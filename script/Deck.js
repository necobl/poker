class Deck {

    cards;  // karte
    cardsCopy;
    constructor(cards) {    // (cards) prihvatamo nase karte koje smo vec napravili
        this.cards = cards;
        this.cardsCopy = [].concat(this.cards) // kada izbacimo nesto iz cards nismo izacili i ovog 
    }

    fiveRandomCards() {     // pravimo 5 slucajnih karata
        let fiveRandomCards = [];
        if (this.cards.length < 6) {  // ako length pao ispod 6 da se osiguramo da ponovo niz napunimo pomocnim
            this.cards = [].concat(this.cardsCopy);
        }
        for (let i = 0; i < 5; i++) {
            let rand = Math.floor(Math.random() * this.cards.length);
            fiveRandomCards.push(this.cards[rand]);
            this.cards.splice(rand, 1);  // kada izvucemo jednu kartu odmah je i obrisemo
        }
        return fiveRandomCards;
    }

}


let deck = new Deck(cardsAll)
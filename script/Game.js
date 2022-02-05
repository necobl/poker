class Game {
    constructor() {
        this.btn = document.querySelector('button');
        this.cards = document.querySelectorAll('.img-holder');
        this.cardIndex = 0; // pratimo koju kartu okrecemo
        this.randomFiveCards = []; // random 5 karata
        this.round = 0;    //
        this.finalCards = []; // koje su to finalne kartice poslije dve runde
    }
    init() {
        this.btn.addEventListener('click', () => this.flip());
    }
    flip() {
        (this.round === 1) ? this.round = 2 : this.round = 1;
        if (this.round === 1) {
            this.removeAllSelected();
        }
        this.btn.innerHTML = "Start" + this.round;
        this.cardIndex = 0;  // svaki put kada pocne nova runda vracamo card index na 0
        this.turnOnBack();
    }
    removeAllSelected() {
        document.querySelectorAll('.selected').forEach(div => {
            div.classList.remove('selected', 'cardWin');
        })
    }
    turnOnBack() {
        this.cards.forEach(card => {
            let front = card.querySelector('.front:not(.selected)');  //od nase karte trazimo front a ne od cijelog dokumenta
            let back = card.children[1];
            if (front) {
                front.style.transform = "perspective(900px) rotateY(180deg)";
                back.style.transform = "perspective(900px) rotateY(0)"
            }


        });
        setTimeout(() => {
            this.shuffleCards();
            this.reveal();
        }, 100)
    }
    reveal() {      // da vidimo jednu po jednu kartu
        let cardFront = this.cards[this.cardIndex].querySelector('.front:not(.selected)');
        let cardBack = this.cards[this.cardIndex].querySelector('.back');
        if (cardFront) {
            this.finalCards[this.cardIndex] = this.randomFiveCards[this.cardIndex];
            cardFront.children[0].setAttribute('src', this.getImage());
            cardFront.setAttribute('data-id', this.randomFiveCards[this.cardIndex].getCard());
            cardFront.onclick = function () {
                cardFront.classList.toggle('selected')
            }
            setTimeout(() => { 
                cardBack.style.transform = "perspective(900px) rotateY(180deg)"; // ovo bi radilo samo za jednu karticu
                cardFront.style.transform = "perspective(900px) rotateY(0)";
                this.cardIndex++;
                if (this.cardIndex < this.cards.length) { //ako ima jos kartica ti okreni
                    this.reveal();
                } else if (this.round === 2) {
                    this.checkWins();
                    document.querySelectorAll(':not(.cardWin)').forEach(div => {
                        div.classList.remove('selected');
                    });
                }
            }, 100)
        } else {
            this.cardIndex++;
            if (this.cardIndex < this.cards.length) {
                this.reveal();
            } else if (this.round === 2) {
                this.checkWins();
                document.querySelectorAll(':not(.cardWin)').forEach(div => {
                    div.classList.remove('selected');
                });
            }
        }

    }
    getImage() {
        return "img/" + this.randomFiveCards[this.cardIndex].sign + "_" + this.randomFiveCards[this.cardIndex].value + ".png";
    }
    shuffleCards() {
        this.randomFiveCards = deck.fiveRandomCards();
    }

    checkWins() {
        let wins = new Wins(this.finalCards);
        if (wins.royalFlush()) {
            console.log("Royal Flush");
            this.selectWinCards(wins);
        } else if (wins.straightFlush()) {
            console.log("Straigth flush");
            this.selectWinCards(wins);
        } else if (wins.poker()) {
            console.log("Poker");
            this.selectWinCards(wins);
        } else if (wins.fullHouse()) {
            console.log("Full house");
            this.selectWinCards(wins);
        } else if (wins.straight()) {
            console.log("Straight");
            this.selectWinCards(wins);
        } else if (wins.threeOfaKind()) {
            console.log("Three of a kind");
            this.selectWinCards(wins);
        } else if (wins.twoPairs()) {
            console.log("Two pairs");
            this.selectWinCards(wins);
        } else if (wins.jacksOrBetter()) {
            console.log("Jacks or better");
            this.selectWinCards(wins);
        }
    }
    selectWinCards(wins) {
        wins.winCards.flat().forEach(card => {
            document.querySelector('[data-id="' + card.getCard() + '"]').classList.add('cardWin', 'selected');
        });

    }

}

let game = new Game();
game.init();
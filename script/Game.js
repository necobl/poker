class Game {

    constructor() {
        this.btn = document.querySelector('button');
        this.cards = document.querySelectorAll('.img-holder');
        this.cardIndex = 0;     // pratimo koju kartu okrecemo
        this.randomFiveCards = [];
        this.round = 0;
        this.finalCards = [];
    }
    init() {
        this.btn.addEventListener('click', () => this.flip());
    }

    flip() {
        (this.round === 1) ? this.round = 2 : this.round = 1; // brojmo runde, da li je to jednako 1, ako jeste promjenimo u 2 ako nije onda je runda 1
        if (this.round === 1) {
            this.removeAllSelected();
        }
        this.btn.innerHTML = "Start " + this.round;
        this.cardIndex = 0;     // svaki put kada pocne nova runda vracamo card index na 0
        this.turnOnback();
    }
    removeAllSelected() {
        document.querySelectorAll('.selected').forEach(div => {
            div.classList.remove('selected');
        });
    }
    turnOnback() {
        this.cards.forEach(card => {
            let front = card.querySelector('.front:not(.selected)');  //od nase karte trazimo front a ne od cijelog dokumenta
            let back = card.children[1];
            if (front) {
                front.style.transform = "perspective(900px) rotateY(180deg)";
                back.style.transform = "perspective(900px) rotateY(0)";
            }

        });

        setTimeout(() => {
            this.shuffleCards();
            this.reveal();
        }, 100)
    }

    reveal() {                                   // da vidimo jednu po jednu kartu
        let cardFront = this.cards[this.cardIndex].querySelector('.front:not(.selected)');
        let cardBack = this.cards[this.cardIndex].querySelector('.back');
        if (cardFront) {
            this.finalCards[this.cardIndex] = this.randomFiveCards[this.cardIndex]; // tako svaku kartu kada izvucemo stavimo u finalcards
            cardFront.children[0].setAttribute('src', this.getImage());
            cardFront.onclick = function () {
                cardFront.classList.toggle('selected')
            }
            setTimeout(() => {
                cardBack.style.transform = "perspective(900px) rotateY(180deg)"; // ovo bi radilo samo za jednu karticu
                cardFront.style.transform = "perspective(900px) rotateY(0)";
                this.cardIndex++;
                if (this.cardIndex < this.cards.length) {          //ako ima jos kartica ti okreni
                    this.reveal();
                }
            }, 100)
        } else {
            this.cardIndex++;
            if (this.cardIndex < this.cards.length) {
                this.reveal();
            }
        }

    }

    getImage() {
        return "img/" + this.randomFiveCards[this.cardIndex].sign + "_" +
            this.randomFiveCards[this.cardIndex].value + ".png";
    }
    shuffleCards() {
        this.randomFiveCards = deck.fiveRandomCards();
    }
}

let game = new Game();
game.init();
class Wins {
    constructor(finalCards) {
        this.finalCards = finalCards;

        this.allJacks = this.finalCards.filter(e => e.value === "jack");
        this.allQueens = this.finalCards.filter(e => e.value === "queen");
        this.allKings = this.finalCards.filter(e => e.value === "king");
        this.allAces = this.finalCards.filter(e => e.value === "ace");

        this.all10 = this.finalCards.filter(e => e.value === 10);
        this.all9 = this.finalCards.filter(e => e.value === 9);
        this.all8 = this.finalCards.filter(e => e.value === 8);
        this.all7 = this.finalCards.filter(e => e.value === 7);
        this.all6 = this.finalCards.filter(e => e.value === 6);
        this.all5 = this.finalCards.filter(e => e.value === 5);
        this.all4 = this.finalCards.filter(e => e.value === 4);
        this.all3 = this.finalCards.filter(e => e.value === 3);
        this.all2 = this.finalCards.filter(e => e.value === 2);

        this.all = [this.allJacks, this.allQueens, this.allKings, this.allAces, this.all10,
        this.all9, this.all8, this.all7, this.all6, this.all5, this.all4, this.all3, this.all2,
        ]
        this.winCards = [];

    }
    royalFlush() {
        if (this.sameSign() && this.highStraight()) {
            this.winCards = this.finalCards;
            return true;
        }
    }

    straightFlush() {
        if (this.sameSign() && this.straight()) {
            this.winCards = this.finalCards;
            return true;
        }
    }
    straight() {
        let found = false;
        let straights = [
            ["ace", 2, 3, 4, 5],
            [2, 3, 4, 5, 6],
            [3, 4, 5, 6, 7],
            [4, 5, 6, 7, 8],
            [5, 6, 7, 8, 9],
            [6, 7, 8, 9, 10],
            [7, 8, 9, 10, "jack"],
            [8, 9, 10, "jack", "queen"],
            [9, 10, "jack", "queen", "king"],
        ];
        straights.forEach(straight => {
            let sortedStraight = straight.sort();
            let sortedFinalCards = this.finalCards.map(e => e.value).sort();
            if (sortedStraight[0] === sortedFinalCards[0] &&
                sortedStraight[1] === sortedFinalCards[1] &&
                sortedStraight[2] === sortedFinalCards[2] &&
                sortedStraight[3] === sortedFinalCards[3] &&
                sortedStraight[4] === sortedFinalCards[4]
            ) {
                found = true;
                this.winCards = this.finalCards;
                return found;
            }
        })
        return found;
    }
    poker() {
        /*  for (let i = 0; i < this.all.length; i++) {
              const arr = this.all[i];
              if (arr.length === 4) {
                  this.winCards = arr;
                  return true;
              }
          }*/
        let x = false; // unutar forEach return nece prekunuti sam forEach i vratit true, dok to nije slucaj sa for loop
        this.all.forEach(arr => {
            if (arr.length == 4) {
                this.winCards = arr;
                x = true;
            }
        })
        return x;
    }

    fullHouse() {
        for (let i = 0; i < this.all.length; i++) {
            const oneSignArray = this.all[i];
            if (oneSignArray.length === 3) {
                for (let j = 0; j < this.all.length; j++) {
                    if (j === i) {
                        continue;
                    }
                    const againOneSignArray = this.all[j];
                    if (againOneSignArray.length === 2) {
                        this.winCards = [oneSignArray, againOneSignArray];
                        return true;
                    }


                }

            }
        }
    }
    highStraight() {

        return this.all10.length === 1 &&
            this.allJacks.length === 1 &&
            this.allQueens.length === 1 &&
            this.allKings.length === 1 &&
            this.allAces.length === 1;

    }

    threeOfaKind() {
        let x = false; // unutar forEach return nece prekunuti sam forEach i vratit true, dok to nije slucaj sa for loop
        this.all.forEach(arr => {
            if (arr.length == 3) {
                this.winCards = arr;
                x = true;
            }
        })
        return x;
    }

    twoPairs() {
        for (let i = 0; i < this.all.length; i++) {
            const oneSignArray = this.all[i];
            if (oneSignArray.length === 2) {
                for (let j = 0; j < this.all.length; j++) {
                    if (j === i) {
                        continue;
                    }
                    const againOneSignArray = this.all[j];
                    if (againOneSignArray.length === 2) {
                        this.winCards = [oneSignArray, againOneSignArray];
                        return true;
                    }


                }

            }
        }
    }

    jacksOrBetter() {
        let highCards = [this.allJacks, this.allQueens, this.allKings, this.allAces];
        for (let i = 0; i < highCards.length; i++) {
            const oneSignArray = highCards[i];
            if (oneSignArray.length === 2) {
                this.winCards = oneSignArray;
                return true;
            }
        }
        return false;
    }

    sameSign() {
        /* return this.finalCards[0].sign === this.finalCards[1].sign &&
             this.finalCards[0].sign === this.finalCards[2].sign &&
             this.finalCards[0].sign === this.finalCards[3].sign &&
             this.finalCards[0].sign === this.finalCards[4].sign;*/
        let first = this.finalCards[0].sign;
        return this.finalCards.every(card => card.sign === first);
    }
}
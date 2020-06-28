class Cards {
    colors = ['c1', 'c3', 'c4', 'c8', 'c9'];// pre difined card color classes
    constructor(cardCount = 9, cardsClass) {
        this.noOfCards = cardCount;
        this.cardsContainer = document.getElementsByClassName(cardsClass)[0];
        this.init();
    }

    /**
     * 
     * Creates cards/boxes based on the noOfcards
     */
    init() {
        let count = 1;
        let template = '';
        let colorsIdx = 0;
        while (count <= this.noOfCards) {
            template += this.cardsTemplate(count, this.colors[colorsIdx]);
            colorsIdx++;
            count++;
            colorsIdx = colorsIdx === this.colors.length ? 0 : colorsIdx;
        }
        this.cardsContainer.innerHTML = template;
    }

    /**
     * 
     * @param {number} i card index
     * @param {string} colorClass card color class name
     * 
     * Template for each card.
     */
    cardsTemplate(i, colorClass) {
        return `<div class="box d-flex-row h-center v-center ${colorClass}" data-originalOrder="${i}">
                    <h1>${i}</h1>
                    <span class="badge ${colorClass}"></span>
                </div>`
    }

    /**
     * Randomly suffeling the crads and using data attribute to assign the order style.
     * Note:using display flex's order feature for re-odering the cards.
     */
    suffelCards() {
        const children = this.getCards();
        let num = this.noOfCards;
        for (const node of children) {
            node.style['order'] = children[this.getRandomNum(num)].dataset['originalorder'];
            num--;
        }
    }


    /**
     * 
     * @param {number} n 
     * spits out random integer 
     */
    getRandomNum(n) {
        return Math.random() * n | 0;
    }

    
    getCards() {
        return this.cardsContainer.children;
    }


    /**
     * 
     * sorts the cards in the ascending order using data attribute called originalorder which was set initally while creating the node.
     */
    sort() {
        const children = this.getCards();
        for (const node of children) {
            node.style['order'] = node.dataset['originalorder'];
        }
    }
}

(function () {
    let cards;
    const shuffle = document.getElementById('btn-shuffle');
    const sort = document.getElementById('btn-sort');

    function onLoad() {
        cards = new Cards(9, 'box-container');
        window.removeEventListener('load', onLoad);
        shuffle.addEventListener('click', () => {
            cards.suffelCards();
        });
        sort.addEventListener('click', () => {
            cards.sort();
        });
    }
    window.addEventListener('load', onLoad);
})()
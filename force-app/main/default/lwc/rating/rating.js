import { LightningElement, api } from 'lwc';

export default class Rating extends LightningElement {
    @api rating = 0;

    get ratingGt0() {
        return this.rating > 0;
    }

    get ratingGt1() {
        return this.rating > 1;
    }

    get ratingGt2() {
        return this.rating > 2;
    }

    get ratingGt3() {
        return this.rating > 3;
    }

    get ratingGt4() {
        return this.rating > 4;
    }
}

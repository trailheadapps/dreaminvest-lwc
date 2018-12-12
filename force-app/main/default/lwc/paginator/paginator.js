import { LightningElement, api } from 'lwc';

export default class Paginator extends LightningElement {
    @api page;
    @api pages;
    @api total;
    @api label = 'items';

    get hasPreviousPage() {
        return this.page > 1;
    }

    get hasMorePages() {
        return this.page < this.pages;
    }

    handlePagePrevious() {
        this.dispatchEvent(new CustomEvent('previouspage'));
    }

    handlePageNext() {
        this.dispatchEvent(new CustomEvent('nextpage'));
    }
}

import { LightningElement, track } from 'lwc';

export default class SearchBar extends LightningElement {
    @track searchKey = '';

    handleKeyPress(event) {
        this.searchKey = event.target.value;
        if (event.keyCode !== 13) {
            return;
        }
        this.fireChangeEvent();
    }

    handleChange(event) {
        event.stopPropagation();
    }

    handleClear() {
        this.searchKey = '';
        this.fireChangeEvent();
    }

    fireChangeEvent() {
        const changeEvent = new CustomEvent('change', {
            detail: this.searchKey
        });
        this.dispatchEvent(changeEvent);
    }
}

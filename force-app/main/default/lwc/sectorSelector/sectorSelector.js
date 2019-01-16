import { LightningElement } from 'lwc';

export default class SectorSelector extends LightningElement {
    handleChange(event) {
        this.dispatchEvent(new CustomEvent('change'), {
            detail: { value: event.target.value }
        });
    }
}

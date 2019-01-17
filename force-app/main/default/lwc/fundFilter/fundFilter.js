import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class FundFilter extends LightningElement {
    @wire(CurrentPageReference) pageRef;

    handleSearchKeyChange(event) {
        if (event.detail !== undefined) {
            fireEvent(this.pageRef, 'dreaminvest__fundfilterchange', {
                searchKey: event.detail
            });
        }
    }

    handleAssetClassChange(event) {
        if (event.detail) {
            fireEvent(this.pageRef, 'dreaminvest__fundfilterchange', {
                assetClass: event.detail.value
            });
        }
    }

    handleSectorChange(event) {
        if (event.detail) {
            let sector = event.detail.value;
            if (Array.isArray(sector)) {
                sector = sector[0];
            }
            if (!sector) {
                sector = '';
            }
            fireEvent(this.pageRef, 'dreaminvest__fundfilterchange', {
                sector
            });
        }
    }
}

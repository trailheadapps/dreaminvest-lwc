import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class FundTile extends NavigationMixin(LightningElement) {
    @api fund;

    handleFundSelected() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                actionName: 'view',
                recordId: this.fund.Id
            }
        });
    }

    handleMouseOver() {
        this.dispatchEvent(new CustomEvent('peekenter'));
    }

    handleMouseOut() {
        this.dispatchEvent(new CustomEvent('peekleave'));
    }

    get avatarClass() {
        return (
            'slds-app-launcher__tile-figure symbol ' + this.fund.Asset_Class__c
        );
    }
}

import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import loadFunds from '@salesforce/apex/FundController.getFunds';
import { registerListener, unregisterAllListeners } from 'c/pubsub';

const PAGE_SIZE = 15;
export default class FundTileList extends LightningElement {
    @track error;
    @track page = 1;

    @track filterObjectStringified = JSON.stringify(this._filterObject);

    @wire(CurrentPageReference) pageRef;

    @wire(loadFunds, {
        filters: '$filterObjectStringified',
        pageSize: PAGE_SIZE,
        pageNumber: '$page',
    })
    wiredFunds;

    _filterObject = {
        searchKey: '',
        sector: '',
        assetClass: '',
        minYtdReturn: -30,
        maxYtdReturn: 30,
        min1YearReturn: -30,
        max1YearReturn: 30,
        min5YearReturn: -30,
        max5YearReturn: 30,
    };

    connectedCallback() {
        registerListener(
            'dreaminvest__fundfilterchange',
            this.handleFundFilterChange,
            this,
        );
        registerListener(
            'dreaminvest__returnrangechange',
            this.handleReturnRangeChange,
            this,
        );
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handlePagePrevious() {
        this.page = this.page - 1;
    }

    handlePageNext() {
        this.page = this.page + 1;
    }

    handleFundFilterChange(event) {
        if (event.searchKey !== undefined) {
            this._filterObject.searchKey = event.searchKey;
        }
        if (event.assetClass !== undefined) {
            this._filterObject.assetClass = event.assetClass;
        }
        if (event.sector !== undefined) {
            this._filterObject.sector = event.sector;
        }
        this.page = 1;
        this.filterObjectStringified = JSON.stringify(this._filterObject);
    }

    handleReturnRangeChange(event) {
        const filterName = event.filterName;
        const minValue = event.minValue;
        const maxValue = event.maxValue;
        if (filterName === 'ytd-return') {
            this._filterObject.minYtdReturn = minValue;
            this._filterObject.maxYtdReturn = maxValue;
        } else if (filterName === '1-year-return') {
            this._filterObject.min1YearReturn = minValue;
            this._filterObject.max1YearReturn = maxValue;
        } else if (filterName === '5-year-return') {
            this._filterObject.min5YearReturn = minValue;
            this._filterObject.max5YearReturn = maxValue;
        }
        this.page = 1;
        this.filterObjectStringified = JSON.stringify(this._filterObject);
    }

    handlePeekEnter(event) {
        const popup = this.template.querySelector('c-fund-info-popup');
        popup.show(event.target, event.target.fund);
    }

    handlePeekLeave() {
        const popup = this.template.querySelector('c-fund-info-popup');
        popup.hide();
    }
}

import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import loadFunds from '@salesforce/apex/FundController.getFunds';
import { registerListener, unregisterAllListeners } from 'c/pubsub';

const PAGE_SIZE = 15;
export default class FundTileList extends LightningElement {
    error;
    page = 1;

    _filter = {
        searchKey: '',
        sector: '',
        assetClass: '',
        minYtdReturn: -30,
        maxYtdReturn: 30,
        min1YearReturn: -30,
        max1YearReturn: 30,
        min5YearReturn: -30,
        max5YearReturn: 30
    };

    @wire(CurrentPageReference) pageRef;

    @wire(loadFunds, {
        filter: '$_filter',
        pageSize: PAGE_SIZE,
        pageNumber: '$page'
    })
    wiredFunds;

    connectedCallback() {
        registerListener(
            'dreaminvest__fundfilterchange',
            this.handleFundFilterChange,
            this
        );
        registerListener(
            'dreaminvest__returnrangechange',
            this.handleReturnRangeChange,
            this
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
            this._filter.searchKey = event.searchKey;
        }
        if (event.assetClass !== undefined) {
            this._filter.assetClass = event.assetClass;
        }
        if (event.sector !== undefined) {
            this._filter.sector = event.sector;
        }
        this._filter = Object.assign({}, this._filter);
        this.page = 1;
    }

    handleReturnRangeChange(event) {
        const filterName = event.filterName;
        const minValue = event.minValue;
        const maxValue = event.maxValue;
        if (filterName === 'ytd-return') {
            this._filter.minYtdReturn = minValue;
            this._filter.maxYtdReturn = maxValue;
        } else if (filterName === '1-year-return') {
            this._filter.min1YearReturn = minValue;
            this._filter.max1YearReturn = maxValue;
        } else if (filterName === '5-year-return') {
            this._filter.min5YearReturn = minValue;
            this._filter.max5YearReturn = maxValue;
        }
        this._filter = Object.assign({}, this._filter);
        this.page = 1;
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

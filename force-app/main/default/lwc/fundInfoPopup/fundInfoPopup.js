import { LightningElement, api } from 'lwc';

const OFFSET_TOP = 234;
const OFFSET_RIGHT = 70;

export default class FundInfoPopup extends LightningElement {
    isVisible;
    _fund;
    _argx;
    _argy;

    @api
    show(element, fund) {
        this._fund = fund;
        const rect = element.getBoundingClientRect();
        this._argx = rect.right - OFFSET_RIGHT;
        this._argy = rect.top - OFFSET_TOP;
        this.isVisible = true;
    }

    @api
    hide() {
        this.isVisible = false;
    }

    get fund() {
        return this._fund;
    }

    get style() {
        return 'left:' + this._argx + 'px;top:' + this._argy + 'px';
    }

    get ytdClass() {
        return 'return ' + (this.fund.YTD_Return__c < 0 ? 'red' : 'green');
    }

    get oneYearClass() {
        return 'return ' + this.getColor(this.fund.One_Year_Return__c);
    }

    get twoYearClass() {
        return 'return ' + this.getColor(this.fund.Two_Year_Return__c);
    }

    get fiveYearClass() {
        return 'return ' + this.getColor(this.fund.Five_Year_Return__c);
    }

    getColor(value) {
        return value < 0 ? 'red' : 'green';
    }
}

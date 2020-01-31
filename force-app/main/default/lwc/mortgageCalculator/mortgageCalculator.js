import { LightningElement } from 'lwc';
import mortgageUtils from 'c/mortgageUtils';

export default class MortgageCalculator extends LightningElement {
    _principal = 200000;
    _years = 30;
    _rate = 5;

    monthlyPayment = 0.0;

    constructor() {
        super();
        this.calculateMonthlyPayment();
    }

    get defaultPrincipal() {
        return this._principal;
    }

    get defaultRate() {
        return this._rate;
    }

    handleYearChange(event) {
        this._years = event.target.value;
        this.calculateMonthlyPayment();
    }

    handlePrincipalChange(event) {
        this._principal = event.target.value;
        this.calculateMonthlyPayment();
    }

    handleRateChange(event) {
        this._rate = event.target.value;
        this.calculateMonthlyPayment();
    }

    calculateMonthlyPayment() {
        this.monthlyPayment = mortgageUtils.calculateMonthlyPayment(
            this._principal,
            this._years,
            this._rate
        );
    }

    get yearOptions() {
        return [
            { label: '20', value: '20' },
            { label: '25', value: '25' },
            { label: '30', value: '30' },
            { label: '35', value: '35' }
        ];
    }
}

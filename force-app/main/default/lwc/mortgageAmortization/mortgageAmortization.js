import { LightningElement } from 'lwc';
import mortgageUtils from 'c/mortgageUtils';

export default class MortgageAmortization extends LightningElement {
    monthlyPayment = 0.0;
    amortization;

    _principal = 200000;
    _years = 30;
    _rate = 5;

    get defaultPrincipal() {
        return this._principal;
    }

    get defaultRate() {
        return this._rate;
    }

    calculateAmortization() {
        this.monthlyPayment = mortgageUtils.calculateMonthlyPayment(
            this._principal,
            this._years,
            this._rate
        );

        const monthlyRate = this._rate / 100 / 12;
        let balance = this._principal;
        const amortization = [];
        for (let y = 0; y < this._years; y += 1) {
            let interestY = 0; // Interest payment for year y
            let principalY = 0; // Principal payment for year y
            for (let m = 0; m < 12; m += 1) {
                const interestM = balance * monthlyRate; // Interest payment for month m
                const principalM = this.monthlyPayment - interestM; // Principal payment for month m
                interestY += interestM;
                principalY += principalM;
                balance -= principalM;
            }
            const cssPrincipal =
                'flex:' + principalY + ';-webkit-flex:' + principalY + ';';
            const cssInterest =
                'flex:' + interestY + ';-webkit-flex:' + interestY + ';';
            amortization.push({
                id: y,
                cssClasses: { principal: cssPrincipal, interest: cssInterest },
                principalY: Math.round(principalY),
                interestY: Math.round(interestY),
                balance: Math.round(balance)
            });
        }
        this.amortization = amortization;
    }

    handlePrincipalChange(event) {
        this._principal = event.target.value;
    }

    handleYearChange(event) {
        this._year = event.target.value;
    }

    handleRateChange(event) {
        this._rate = event.target.value;
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

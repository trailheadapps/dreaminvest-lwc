import { LightningElement, track, wire } from 'lwc';
import stockUtils from 'c/stockUtils';
import getStockServiceApiKey from '@salesforce/apex/StockServiceController.getStockServiceApiKey';

export default class StockWidget extends LightningElement {
    @wire(getStockServiceApiKey)
    apiKey({ error, data }) {
        if (error) {
            this.error = error;
        } else if (data) {
            this.error = undefined;
        }
    }

    @track error;
    @track stock;
    @track symbol;

    getStock() {
        if (this.symbol && this.apiKey.data) {
            stockUtils
                .getStock(this.apiKey.data, this.symbol)
                .then(stock => {
                    this.stock = stock;
                })
                .catch(error => {
                    this.error = error;
                });
        }
    }

    handleSymbolChange(event) {
        this.symbol = event.target.value;
        if (!this.symbol) {
            this.stock = null;
        }
    }
}

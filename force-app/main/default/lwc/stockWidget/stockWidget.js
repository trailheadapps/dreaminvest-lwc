import { LightningElement, track, wire } from 'lwc';
import stockUtils from 'c/stockUtils';
import getStockServiceApiKey from '@salesforce/apex/StockServiceController.getStockServiceApiKey';

export default class StockWidget extends LightningElement {
    @wire(getStockServiceApiKey)
    wiredApiKey({ error, data }) {
        if (error) {
            this.error = error;
            this.apiKey = undefined;
        } else if (data) {
            this.error = undefined;
            this.apiKey = data;
        }
    }

    @track apiKey;
    @track error;
    @track stock;
    @track symbol;

    getStock() {
        if (this.symbol && this.apiKey) {
            stockUtils
                .getStock(this.apiKey, this.symbol)
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

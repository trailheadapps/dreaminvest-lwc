import React from 'react';
import { IconSettings, Button, Input, Card } from '@salesforce/design-system-react';
import WatchListRow from './WatchListRow';
import * as feed from './../feed-mock';

class WatchList extends React.Component {

    constructor(props) {
        super(props);
        let stocks = {};
        props.data.symbols.forEach(symbol => {
            stocks[symbol] = feed.getStock(symbol);
        });
        this.state = { stocks };
    }

    componentDidMount() {
        this.subscriber = this.handleStockChange.bind(this);
        feed.subscribe(this.subscriber);
    }

    componentWillUnmount() {
        feed.unsubscribe(this.subscriber);
    }

    handleStockChange(stock) {
        let stocks = this.state.stocks;
        if (stocks[stock.symbol]) {
            stocks[stock.symbol] = stock;
        }
        this.setState({ stocks: stocks, last: stock });
    }

    linkHandler(property) {
        window.location.hash = "#property/" + property.property_id;
    }

    actionHandler(data, value, label) {
        if (label === "Delete") {
            this.props.onDelete(data);
        } else if (label === "Edit") {
            this.props.onEdit(data);
        }
    }

    sortHandler(col) {
        this.setState({ sortField: col });
    }

    symbolChangeHandler(event) {
        this.setState({ symbols: event.target.value });
    }

    handleAddSymbols() {
        if (this.state.symbols) {
            const symbols = this.state.symbols.split(",");
            let stocks = this.state.stocks;
            symbols.forEach(symbol => {
                stocks[symbol] = feed.getStock(symbol);
            });
            this.setState({ stocks });
        }
    }

    handleDeleteWatchList() {
        this.props.onDelete(this.props.data.watchListId);
    }

    render() {

        let rows = [];
        for (var symbol in this.state.stocks) {
            const stock = this.state.stocks[symbol];
            rows.push(<WatchListRow key={stock.symbol} stock={stock} last={this.state.last}
                onSell={this.props.onSell}
                onBuy={this.props.onBuy}
                onRemove={this.props.onRemove} />);
        }

        rows.sort((a, b) => {
            return a.props.stock[this.state.sortField] < b.props.stock[this.state.sortField] ? -1 : 1;
        });

        return (
            <Card heading="Watch List" style={{ flex: 1, margin: '4px' }}
                headerActions={(
                    <Button iconCategory="utility" iconName="close" variant="base" onClick={this.handleDeleteWatchList.bind(this)} />
                )}
                footer={
                    (
                        <IconSettings iconPath="/assets/icons">
                        <div style={{ display: 'flex'}}>
                            <Input placeholder="Symbol" className="slds-m-right_xx-small" onChange={this.symbolChangeHandler.bind(this)} />
                            <Button label="Add"
                                    onClick={this.handleAddSymbols.bind(this)} />
                        </div>
                        </IconSettings>
                    )
                }>
                <table className="slds-table slds-table_bordered slds-table_cell-buffer slds-table_col-bordered slds-no-row-hover">
                    <thead>
                        <tr className="slds-text-heading--label">
                            <th className="slds-is-sortable" scope="col">
                                <span className="slds-truncate">Symbol</span>
                                <button className="slds-button slds-button--icon-base slds-button--icon-border-small" onClick={this.sortHandler.bind(this, 'symbol')}>
                                    <span className="slds-assistive-text">Sort</span>
                                </button>
                            </th>
                            <th className="slds-is-sortable" scope="col" style={{ textAlign: "right", width: "110px" }}>
                                <span className="slds-truncate">Open</span>
                                <button className="slds-button slds-button--icon-base slds-button--icon-border-small" onClick={this.sortHandler.bind(this, 'open')}>
                                    <span className="slds-assistive-text">Sort</span>
                                </button>
                            </th>
                            <th className="slds-is-sortable" scope="col" style={{ textAlign: "right", width: "110px" }}>
                                <span className="slds-truncate">Last</span>
                                <button className="slds-button slds-button--icon-base slds-button--icon-border-small" onClick={this.sortHandler.bind(this, 'last')}>
                                    <span className="slds-assistive-text">Sort</span>
                                </button>
                            </th>
                            <th className="slds-is-sortable" scope="col" style={{ textAlign: "right", width: "110px" }}>
                                <span className="slds-truncate">Change</span>
                                <button className="slds-button slds-button--icon-base slds-button--icon-border-small" onClick={this.sortHandler.bind(this, 'change')}>
                                    <span className="slds-assistive-text">Sort</span>
                                </button>
                            </th>
                            <th className="slds-is-sortable" scope="col" style={{ textAlign: "right", width: "110px" }}>
                                <span className="slds-truncate">High</span>
                                <button className="slds-button slds-button--icon-base slds-button--icon-border-small" onClick={this.sortHandler.bind(this, 'high')}>
                                    <span className="slds-assistive-text">Sort</span>
                                </button>
                            </th>
                            <th className="slds-is-sortable" scope="col" style={{ textAlign: "right", width: "110px" }}>
                                <span className="slds-truncate">Low</span>
                                <button className="slds-button slds-button--icon-base slds-button--icon-border-small" onClick={this.sortHandler.bind(this, 'low')}>
                                    <span className="slds-assistive-text">Sort</span>
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </Card>
        );
    }

}

WatchList.defaultProps = {
    stocks: {}
};

export default WatchList;

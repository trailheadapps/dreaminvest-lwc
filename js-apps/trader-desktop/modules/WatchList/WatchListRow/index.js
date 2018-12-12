import React from 'react';

class WatchListRow extends React.Component {

    actionHandler(value, label) {
        if (label==="Buy") {
            this.props.onBuy(this.props.stock)
        } else if (label==="Sell") {
            this.props.onSell(this.props.stock)
        } else if (label==="Remove") {
            this.props.onRemove(this.props.stock)
        }
    }

    render() {
        let lastBackgroundColor = 'transparent',
            changeClass = 'change-positive',
            iconClass = 'glyphicon glyphicon-triangle-top';
        if (this.props.stock === this.props.last) {
            lastBackgroundColor = this.props.stock.change < 0 ? 'red' : 'green';
        }
        if (this.props.stock.change < 0) {
            changeClass = 'change-negative';
            iconClass = 'glyphicon glyphicon-triangle-bottom';
        }
        return (
            <tr>
                <td data-label="stage">
                    <span>{this.props.stock.symbol}</span>
                </td>
                <td data-label="open" style={{textAlign: "right"}}>
                    <span>{this.props.stock.open}</span>
                </td>
                <td data-label="last" style={{textAlign: "right", backgroundColor: lastBackgroundColor}}>
                    <span>{this.props.stock.last}</span>
                </td>
                <td data-label="change" style={{textAlign: "right"}}>
                    <span style={{color: this.props.stock.change<0?"red":"green"}}>{this.props.stock.change}</span>
                </td>
                <td data-label="high" style={{textAlign: "right"}}>
                    <span>{this.props.stock.high}</span>
                </td>
                <td data-label="low" style={{textAlign: "right"}}>
                    <span>{this.props.stock.low}</span>
                </td>
            </tr>
        );
    }
}

export default WatchListRow;
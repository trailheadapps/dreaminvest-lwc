import React from 'react';
import ReactDOM from 'react-dom';
import LCC from 'lightning-container';
import { IconSettings, Button } from '@salesforce/design-system-react';
import * as feed from './modules/feed-mock';
import WatchList from './modules/WatchList';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            watchLists: []
        };
    }

    componentDidMount() {
        try {
            var msg = {
                name: "Initialized"
            };
            LCC.sendMessage(msg);
            LCC.addMessageHandler((message) => {
                this.watchListId = 0;
                let lists = [];
                let symbols = [];
                message.watchLists.forEach(watchList => {
                    lists.push({ watchListId: this.watchListId++, symbols: watchList });
                    symbols = symbols.concat(watchList);
                });
                feed.watch(symbols);
                this.setState({ watchLists: lists });
            });
        } catch (e) {
            console.log(e);
        }
    }

    handleAddWatchList() {
        this.watchListId = this.watchListId + 1;
        const watchLists = [...this.state.watchLists, { watchListId: this.watchListId, symbols: [] }];
        this.setState({ watchLists });
    }

    handleDeleteWatchList(watchListId) {
        this.setState({ 'watchLists': this.state.watchLists.filter(watchList => watchList.watchListId !== watchListId) });
    }

    render() {
        let tiles = this.state.watchLists.map(watchList =>
            <WatchList key={watchList.watchListId} data={watchList} onDelete={this.handleDeleteWatchList.bind(this)} />
        );
        return (
            <IconSettings iconPath="assets/icons">
                <div>
                    <Button
                        className="slds-m-left_xx-small slds-m-bottom_xx-small slds-m-top_xxx-small"
                        iconCategory="utility"
                        iconName="add"
                        iconPosition="left"
                        label="Watch List"
                        onClick={this.handleAddWatchList.bind(this)} />
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {tiles}
                    </div>
                </div>
            </IconSettings>
        );
    }

}

ReactDOM.render(<App />, document.getElementById('app'));
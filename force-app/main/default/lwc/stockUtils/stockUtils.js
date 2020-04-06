const getStock = (apiKey, symbol) => {
    return fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
    )
        .then((response) => {
            return response.json();
        })
        .then((stock) => {
            const s = {
                symbol: stock['Global Quote']['01. symbol'],
                open: stock['Global Quote']['02. open'],
                high: stock['Global Quote']['03. high'],
                low: stock['Global Quote']['04. low'],
                price: stock['Global Quote']['05. price'],
                volume: stock['Global Quote']['06. volume'],
                lastestTradingDay:
                    stock['Global Quote']['07. latest trading day'],
                previousClose: stock['Global Quote']['08. previous close'],
                change: stock['Global Quote']['09. change'],
                changePercent:
                    stock['Global Quote']['10. change percent'].slice(0, -1) /
                    100
            };
            return s;
        });
};

export { getStock };

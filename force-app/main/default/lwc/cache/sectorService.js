import getSectors from '@salesforce/apex/FundController.getSectors';

let sectors = null;

const getSectorsFromCache = () => {
    if (sectors) {
        // Returning sectors from cache
        return Promise.resolve(sectors);
    }
    // Returning sectors from server
    return getSectors().then(data => {
        sectors = data;
        return data;
    });
};

const clearCache = () => {
    sectors = null;
};

export default {
    getSectors,
    getSectorsFromCache,
    clearCache
};

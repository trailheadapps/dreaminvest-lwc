import getAssetClasses from '@salesforce/apex/FundController.getAssetClasses';

let assetClasses = null;

const getAssetClassesFromCache = () => {
    if (assetClasses) {
        // Returning asset classes from cache
        return Promise.resolve(assetClasses);
    }
    // Returning asset classes from server
    return getAssetClasses().then(data => {
        assetClasses = data;
        return assetClasses;
    });
};

const clearCache = () => {
    assetClasses = null;
};

export default {
    getAssetClasses,
    getAssetClassesFromCache,
    clearCache,
};

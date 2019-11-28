public with sharing class StockServiceController {
    @AuraEnabled(cacheable=true)
    public static String getStockServiceApiKey() {
        DreamInvest_Settings__c settings = DreamInvest_Settings__c.getOrgDefaults();
        return settings.Stock_Service_API_Key__c;
    }
}

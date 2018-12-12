@isTest
public class FundControllerTest {
    
    static testMethod void testGetFunds() {
        Boolean success = true;
        try {
            Sector__c s = new Sector__c(Name='Test Sector');
            insert s;
            Fund__c f = new Fund__c(Name='Test Fund', Sector__c=s.Id);
            insert f;
            FundController.PagedResult result = FundController.getFunds('{}', 10, 1);
        } catch (Exception e) {
            success = false;
        } finally {
	        System.assert(success);
        }
    }

    static testMethod void testGetSectors() {
        Boolean success = true;
        try {
            Sector__c s = new Sector__c(Name='Test Sector');
            insert s;
            FundController.getSectors();
        } catch (Exception e) {
            success = false;
        } finally {
	        System.assert(success);
        }
    }

    static testMethod void testGetAssetClasses() {
        Boolean success = true;
        try {
            FundController.getAssetClasses();
        } catch (Exception e) {
            success = false;
        } finally {
	        System.assert(success);
        }
    }
    
}
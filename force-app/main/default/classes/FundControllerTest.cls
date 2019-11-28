@isTest
public class FundControllerTest {
    @isTest
    static void testGetFunds() {
        Boolean success = true;
        try {
            Sector__c s = new Sector__c(Name = 'Test Sector');
            insert s;
            Fund__c f = new Fund__c(Name = 'Test Fund', Sector__c = s.Id);
            insert f;
            FundController.Filter filter = new FundController.Filter();
            FundController.PagedResult result = FundController.getFunds(
                filter,
                10,
                1
            );
        } catch (Exception e) {
            success = false;
        } finally {
            System.assert(success);
        }
    }

    @isTest
    static void testGetSectors() {
        Boolean success = true;
        try {
            Sector__c s = new Sector__c(Name = 'Test Sector');
            insert s;
            FundController.getSectors();
        } catch (Exception e) {
            success = false;
        } finally {
            System.assert(success);
        }
    }
}

import { LightningElement, track } from 'lwc';
import { sectorService } from 'c/cache';

export default class SectorList extends LightningElement {
    @track error;
    @track sectors = [];

    handleSectorsLoad() {
        sectorService
            .getSectors()
            .then(result => {
                this.sectors = result;
            })
            .catch(error => {
                this.error = error.message;
            });
    }

    handleSectorsFromCacheLoad() {
        sectorService
            .getSectorsFromCache()
            .then(result => {
                this.sectors = result;
            })
            .catch(error => {
                this.error = error.message;
            });
    }

    handleSectorCacheClear() {
        sectorService.clearCache();
    }

    handleClear() {
        this.sectors = [];
    }
}

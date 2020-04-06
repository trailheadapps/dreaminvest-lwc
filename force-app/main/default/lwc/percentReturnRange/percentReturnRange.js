import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import NO_UI_SLIDER from '@salesforce/resourceUrl/nouislider';

export default class PercentReturnRange extends LightningElement {
    @api filterName;
    @api label;
    @api min = '0';
    @api max = '1000';
    @api step = '10';

    @wire(CurrentPageReference) pageRef;

    _isRendered;

    renderedCallback() {
        if (this._isRendered) return;
        this._isRendered = true;
        Promise.all([
            loadStyle(this, NO_UI_SLIDER + '/nouislider.css'),
            loadScript(this, NO_UI_SLIDER + '/nouislider.js')
        ]).then(() => {
            const slider = this.template.querySelector('.slider');
            window.noUiSlider.create(slider, {
                start: [this.min, this.max],
                connect: true,
                tooltips: true,
                step: Number.parseInt(this.step, 10),
                format: {
                    to(value) {
                        return Math.round(value) + '%';
                    },
                    from(value) {
                        return value;
                    }
                },
                range: {
                    min: Number.parseInt(this.min, 10),
                    max: Number.parseInt(this.max, 10)
                }
            });
            slider.noUiSlider.on('change', (range) => {
                fireEvent(this.pageRef, 'dreaminvest__returnrangechange', {
                    filterName: this.filterName,
                    minValue: range[0].replace('%', ''),
                    maxValue: range[1].replace('%', '')
                });
            });
        });
    }
}

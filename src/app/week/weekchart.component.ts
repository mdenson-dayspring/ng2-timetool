import { Directive, ElementRef, Input } from '@angular/core';
import { DayInfo } from '../models';

@Directive({
    selector: 'weekchart'
})
export class WeekChartDirective {
    el: HTMLElement;
    private _content: DayInfo[];
    private _todayNdx: number;

    @Input()
    set dayOfWeek(dow: number) {
        this._todayNdx = dow;
    }

    @Input()
    set content(c: DayInfo[]) {
        console.log('Setting content ...');
        this._content = c;
        if (c !== undefined) {
            this.draw();
        }
    }

    constructor(elementRef: ElementRef) {
        console.log('Constructing WeekChartComponent');
        this.el = elementRef.nativeElement;
        if (!google) {
            console.log('Hey! It seems the needed google api is not loaded.');
        }
    }

    public draw(): void {
        console.log('Drawing the data');

        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Day');
        data.addColumn('string', 'Hours');
        data.addColumn('string', 'Diff');

        let dataList: any = this._content
            .map((item, ndx) => {
                let estimate = (this._todayNdx < ndx);
                if (item.show()) {
                    return [item.name, item.getHours(estimate), item.getDiff(estimate)];
                }
            })
            .filter(item => {
                return (item !== undefined);
            });
        data.addRows(dataList);

        // Set chart options
        let options = {
            'title': '',
            'width': 300,
            'height': 300,
            'allowHtml': true,
            'showRowNumber': false
        };

        let formatter = new google.visualization.ArrowFormat({ width: 40 });
        formatter.format(data, 2);

        // Instantiate and draw our chart, passing in some options.
        let chart = new google.visualization.ChartWrapper();
        chart.setDataTable(data);
        chart.setChartType('Table');
        chart.setOptions(options);
        chart.draw(this.el);
    }
}

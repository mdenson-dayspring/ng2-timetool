import { Directive, ElementRef, Input } from '@angular/core';
import { DayInfo, HM } from '../models';

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

        let totalGoal: number = 0;
        let totalActual: number = 0;
        let dataList: any = this._content
            .map((day, ndx) => {
                if (day.show()) {
                    totalGoal += day.getGoal().minutes;
                    let printEstimate = false;
                    if (ndx >= this._todayNdx && day.getActual() === undefined) {
                        totalActual += day.getGoal().minutes;
                        printEstimate = true;
                    } else if (day.getActual() !== undefined) {
                        totalActual += day.getActual().minutes;
                    } else if (day.getActual() === undefined) {
                        day.setActual(new HM(0));
                    }
                    return [day.name, day.getHours(printEstimate), day.getDiff(printEstimate)];
                }
            })
            .filter(item => {
                return (item !== undefined);
            });
        let totalDI = new DayInfo('Total', new HM(totalGoal), new HM(totalActual));
        dataList.push([
            'Total',
            totalDI.getHours(false),
            totalDI.getDiff(false)
        ]);
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

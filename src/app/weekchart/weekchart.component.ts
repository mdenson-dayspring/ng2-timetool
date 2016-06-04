import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: 'weekchart'
})
export class WeekChartDirective {
    el: HTMLElement;
    _content: string = '';

    @Input()
    set content(c: string) {
        console.log('Setting content ...');
        this._content = c;
        this.draw();
    }
    get content(): string { return this._content; }

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
        data.addColumn('string', undefined);
        data.addColumn('number', undefined);
        data.addColumn('number', undefined);
        data.addRows([
            ['Monday', 9, 1],
            ['Tuesday', 1, -7],
            ['Wednesday', 1, -7],
            ['Thursday', 8, undefined],
            ['Friday', 8, undefined]
        ]);

        // Set chart options
        let options = {
            'title': '',
            'width': 300,
            'height': 300,
            'allowHtml': true,
            'showRowNumber': false
        };

        let formatter = new google.visualization.ArrowFormat({width: 40});
        formatter.format(data, 2);

        // Instantiate and draw our chart, passing in some options.
        let chart = new google.visualization.ChartWrapper();
        chart.setDataTable(data);
        chart.setChartType('Table');
        chart.setOptions(options);
        chart.draw(this.el);
    }
}

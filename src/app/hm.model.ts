export class HM {
    decimal: number;

    static Now(): HM {
        let now = new Date(), hour, min;
        hour = now.getHours();
        min = now.getMinutes();
        return new HM(hour, min);
    }

    constructor(decimal: number);
    constructor(strValue: string);
    constructor(hour: number, min: number);
    constructor(param1: (string|number), param2?: number) {
        if (param2 !== undefined) {
            this.set(<number>param1, param2);
        } else if (typeof param1 === 'number') {
            this.decimal = param1;
        } else {
            this.parse(<string>param1);
        }
    }

    public toString(pos = '', neg = '-'): string {
        let sign = (this.decimal < 0) ? -1 : 1;
        let decimal = Math.abs(this.decimal);
        let hours = Math.floor(decimal);
        let minutes = Math.round((decimal - hours) * 60);

        if (minutes === 60) {
            hours++;
            minutes = 0;
        }

        let s = (sign < 0) ? neg : pos;
        if (decimal < 0.01) {
            s = '';
        }
        let minstr = ('00' + minutes).substr(-2);
        return s + hours + ':' + minstr;
    }

    public add(add2: HM): HM {
        return new HM(this.decimal + add2.decimal);
    }

    public sub(sub2: HM): HM {
        return new HM(this.decimal - sub2.decimal);
    }

    private parse(value: string) {
        let sign: number;
        if (/^[\+\-]?\d{1,2}:\d{2}$/.test(value)) {
            if (value[0] === '-') {
                sign = -1;
                value = value.substr(1);
            } else if (value[0] === '+') {
                sign = 1;
                value = value.substr(1);
            } else {
                sign = 1;
            }
            let parts = value.split(':');
            this.decimal = sign * (parseFloat(parts[0]) + (parseFloat(parts[1]) / 60));
        } else {
            throw new Error('Invalid time string.');
        }
    }

    private set(hour: number, min: number) {
        let sign: number, decimal: number;
        if (hour !== 0) {
            sign = (hour < 0) ? -1 : 1;
        } else {
            sign = (min < 0) ? -1 : 1;
        }
        this.decimal = sign * (Math.abs(hour) + Math.abs(min / 60));
    }
}

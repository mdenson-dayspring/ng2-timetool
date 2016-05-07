export class HM {
    decimal: number;

    constructor(decimal: number);
    constructor(strValue: string);
    constructor(hour: number, min: number);
    constructor(param1: (string|number), param2?: number) {
        if (param2 != null) {
            this.set(<number>param1, param2);
        } else if (typeof param1 === "number") {
            this.decimal = param1;
        } else {
            this.parse(<string>param1);
        }
    }

    static Now(): HM {
        var now = new Date(), hour, min;
        hour = now.getHours();
        min = now.getMinutes();
        return new HM(hour, min);
    }
    
    private parse(value: string) {
        var sign: number;
        if (/^[\+\-]?\d{1,2}:\d{2}$/.test(value)) {
            if(value[0] == '-') {
                sign=-1;
                value = value.substr(1);
            } else if (value[0] == '+') {
                sign = 1;
                value = value.substr(1);
            } else {
                sign = 1;
            }
            var parts = value.split(':');
            this.decimal = sign * (parseFloat(parts[0]) + (parseFloat(parts[1])/60));
        } else {
            throw new Error("Invalid time string.");
        }
    }
    private set(hour: number, min: number) {
        var sign: number, decimal:number;
        if (hour != 0) {
            sign = (hour < 0) ? -1 : 1;
        } else {
            sign = (min < 0) ? -1 : 1;
        }
        this.decimal = sign * (Math.abs(hour) + Math.abs(min/60));
    }

    public toString(pos="", neg="-"): string {
        var sign = (this.decimal<0) ? -1 : 1;
        var decimal = Math.abs(this.decimal);
        var hours = Math.floor(decimal);
        var minutes = Math.round((decimal - hours) * 60);

        if (minutes == 60) {
            hours++;
            minutes = 0;
        }

        var s = (sign<0) ? neg : pos;
        if (decimal<0.01) {
            s='';
        }
        var minstr = ("00" + minutes).substr(-2);
        return s + hours + ":" + minstr;
    }

    public add(add2: HM): HM{
        return new HM(this.decimal + add2.decimal);
    }
    public sub(sub2: HM): HM{
        return new HM(this.decimal - sub2.decimal);
    }
}

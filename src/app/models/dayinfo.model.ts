/**
 * Created by mdenson on 12/11/2015.
 */
import { HM } from './index';

export class DayInfo {
    name: string;
    private _goal: HM;
    private _actual: HM;

    constructor(name: string, goal?: (string | HM), actual?: (string | HM)) {
        this.name = name;
        if (goal) {
            this.setGoal(goal);
        }
        if (actual) {
            this.setActual(actual);
        }
    }

    show(): boolean {
        return (this._goal !== undefined) || (this._actual !== undefined);
    };

    setActual(a: (string | HM)) {
        if (typeof a === 'string') {
            this._actual = new HM(a);
        } else {
            this._actual = a;
        }
    }
    getActual(): HM {
        return this._actual;
    }
    setGoal(g: (string | HM)) {
        if (typeof g === 'string') {
            this._goal = new HM(g);
        } else {
            this._goal = g;
        }
    }
    getGoal(): HM {
        return this._goal;
    }

    getHours(estimate = false): string {
        if (estimate && this._goal) {
            return ('     ' + this._goal.toString()).substr(-5);
        } else if (!estimate && this._actual) {
            return ('     ' + this._actual.toString()).substr(-5);
        }

        return undefined;
    }
    getDiff(estimate = false): string {
        if (this.show) {
            if (!estimate && this._actual) {
                return this._actual.sub(this._goal).toString('↑', '↓');
            }
        }

        return undefined;
    }

    toString(estimate = false): string {
        let name = (this.name + '         ').substr(0, 9);
        let actual = this.getHours(estimate);
        let diff = this.getDiff(estimate);
        if (!diff) {
            diff = ' _____';
        }
        return name + ' ' + actual + ' ' + diff;
    };
}


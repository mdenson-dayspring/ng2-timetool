/**
 * Created by mdenson on 12/11/2015.
 */
import { HM } from './hourminute.model';
import { Today } from './today.model';

export class DayInfo {
    name: string;
    goal: HM;
    actual: HM;

    constructor(name: string, goal: string, actual: HM) {
        this.name = name;
        if (goal) {
            this.goal = new HM(goal);
        }
        this.actual = actual;
    }
    public show(): boolean {
        return (this.goal !== undefined) || (this.actual !== undefined);
    };
    public diffHM(): string {
        if (this.actual) {
            return this.actual.sub(this.goal).toString('↑', '↓');
        } else {
            return '';
        }
    };
    public toString(estimate = false): string {
        let name = (this.name + '         ').substr(0, 9);
        let actual = ('     ' + this.goal.toString()).substr(-5);
        let diff = ' _____';
        if (!estimate) {
            actual = ('     ' + this.actual.toString()).substr(-5);
            diff = ('      ' + this.diffHM()).substr(-6);
        }
        return name + ' ' + actual + ' ' + diff;
    };
}


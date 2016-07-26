import { HM, Today } from './index';

export enum DayOfWeek {
    SUN = 0,
    MON,
    TUE,
    WED,
    THU,
    FRI,
    SAT
}

export class Context {
    today: Today;
    now: Today;

    staff: string;
    expected: TodayTimes;
    goals: string[];

    constructor() {
        this.expected = new TodayTimes();
        this.goals = [];
    }
}

export class TodayTimes {
    arrive: string;
    lunch: string;
    leave: string;
}

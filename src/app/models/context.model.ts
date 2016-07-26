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

    public updateNow(nowHM) {
        console.log('Context.updateNow(nowHM) ', nowHM.toString());
        this.today = new Today(
            new HM(this.expected.arrive),
            new HM(this.expected.lunch),
            new HM(this.expected.leave));
        this.now = new Today(
            new HM(this.expected.arrive),
            new HM(this.expected.lunch),
            nowHM);
    }
}

export class TodayTimes {
    arrive: string;
    lunch: string;
    leave: string;
}

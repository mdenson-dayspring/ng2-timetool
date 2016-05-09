import {HM} from './hourminute.model';
import {Today} from './today.model';

export class Context {
    today: Today;
    now: Today;

    staff: string;

    arriveStr: string;
    lunchStr: string;
    leaveStr: string;

    gSun: string;
    gMon: string;
    gTue: string;
    gWed: string;
    gThu: string;
    gFri: string;
    gSat: string;
}

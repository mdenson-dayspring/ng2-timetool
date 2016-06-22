import { HM } from './index';

describe('HourMinute Model Class', () => {
    it('Can construct from string', () => {
        let hm = new HM('10:00');
        expect(hm.decimal).toBe(10);
        hm = new HM('-10:36');
        expect(hm.decimal).toBe(-10.6);
        hm = new HM('+9:36');
        expect(hm.decimal).toBe(9.6);
    });
    it('Can construct from decimal', () => {
        let hm = new HM(10);
        expect(hm.decimal).toBe(10);
    });
    it('Can construct from hour-minute', () => {
        let hm = new HM(10, 6);
        expect(hm.decimal).toBe(10.1);
        hm = new HM(-10, 6);
        expect(hm.decimal).toBe(-10.1);
        hm = new HM(10, -6);
        expect(hm.decimal).toBe(10.1);
        hm = new HM(0, -6);
        expect(hm.decimal).toBe(-0.1);
    });
    it('toString with default signs', () => {
        let hm = new HM(10, 6);
        expect(hm.toString()).toBe('10:06');
        hm = new HM(-10, 6);
        expect(hm.toString()).toBe('-10:06');
    });
    it('toString with changed signs', () => {
        let hm = new HM(10, 6);
        expect(hm.toString('+')).toBe('+10:06');
        hm = new HM(-10, 6);
        expect(hm.toString('+', '--')).toBe('--10:06');
    });
    it('edge cases in toString', () => {
        let hm = new HM(10, 59);
        expect(hm.toString()).toBe('10:59');
        hm = new HM(10.99);
        expect(hm.toString()).toBe('10:59');
        hm = new HM(0, 90);
        expect(hm.toString()).toBe('1:30');
        hm = new HM(0.000001);
        expect(hm.toString()).toBe('0:00');
        hm = new HM(-0.000001);
        expect(hm.toString()).toBe('0:00');
    });
    it('add 2 HM values', () => {
        let one = new HM(4, 12);
        let two = new HM(5, 36);
        expect(one.add(one).toString()).toBe('8:24');
        expect(one.add(two).toString()).toBe('9:48');
        expect(two.add(two).toString()).toBe('11:12');
        two = new HM(-5, 36);
        expect(one.add(two).toString()).toBe('-1:24');
        expect(two.add(one).toString()).toBe('-1:24');
    });
    it('sub 2 HM values', () => {
        let one = new HM(4, 12);
        let two = new HM(5, 36);
        expect(one.sub(one).toString()).toBe('0:00');
        expect(one.sub(two).toString()).toBe('-1:24');
        expect(two.sub(one).toString()).toBe('1:24');
        expect(two.sub(two).toString()).toBe('0:00');
        two = new HM(-5, 36);
        expect(one.sub(two).toString()).toBe('9:48');
        expect(two.sub(one).toString()).toBe('-9:48');
    });

    it('test HM.now()', () => {
        let nowDate = new Date();
        let nowHM = HM.Now();
        let nowFromDate = new HM(nowDate.getHours(), nowDate.getMinutes());
        expect(nowHM).toEqual(nowFromDate);
    });
});

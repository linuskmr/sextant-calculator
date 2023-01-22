import { describe, it, expect } from 'vitest';
import { dayOfYear, sunDeclination } from './sun_declination';
import { Angle } from './angle';



// Day of year tests

describe('first day of year', () => {
	it('returns 1 as the day of year for date 2022-01-01', () => {
		expect(dayOfYear(new Date(2022, /*January*/0, 1))).toBe(1);
	});
});

describe('last day of year', () => {
	it('returns 365 as the day of year for date 2022-12-31', () => {
		expect(dayOfYear(new Date(2022, /*December*/11, 31))).toBe(365);
	});
});



// Sun declination tests

describe('sun declination for January 1', () => {
	it('returns -23.0° for the sun declination of January 1', () => {
		const computed = sunDeclination(dayOfYear(new Date(2022, /*January*/0, 1))).valueOf();
		const actual = Angle.from_deg_min_sec(-23, 0, 0).valueOf();
		const diff = Math.abs(computed - actual);
		expect(diff).toBeLessThan(0.7);
	});
});

describe('sun declination for February 1', () => {
	it('returns -23.0° for the sun declination of February 1', () => {
		const computed = sunDeclination(dayOfYear(new Date(2022, /*February*/1, 1))).valueOf();
		const actual = Angle.from_deg_min_sec(-17, 5, 0).valueOf();
		const diff = Math.abs(computed - actual);
		expect(diff).toBeLessThan(0.7);
	});
});

describe('sun declination for June 15', () => {
	it('returns -23.0° for the sun declination of June 15', () => {
		const computed = sunDeclination(dayOfYear(new Date(2022, /*June*/5, 15))).valueOf();
		const actual = Angle.from_deg_min_sec(23, 19, 0).valueOf();
		const diff = Math.abs(computed - actual);
		expect(diff).toBeLessThan(0.7);
	});
});
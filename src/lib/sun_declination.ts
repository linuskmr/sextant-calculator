import { Angle } from "./angle"

/**
 * Returns the sun declination for a given day of the year in degrees.
 * @see https://www.pveducation.org/pvcdrom/properties-of-sunlight/declination-angle#footnote1_be0p6mf
 * @param days number of days since the start of the year, i.e. a value between 0 and 365
 * @returns Sun declination in degrees
 */
export function sunDeclination(days: number): Angle {
	const decl = radToDeg(degToRad(-23.45) * Math.cos(degToRad((360/365) * (days + 10))))
	console.log("sun declination", decl)
	return new Angle(decl)
}

/**
 * Returns the day of the year for a given date. Used with `sunDeclination()`.
 */
export function dayOfYear(date: Date): number {
	const firstDayOfYear = new Date(date.getFullYear(), /*January*/0, 1)
	const millisecondDiff: number = date.getTime() - firstDayOfYear.getTime()
	const millisecondsInADay = 1000/*ms/sec*/ * 60/*sec/min*/ * 60/*min/h*/ * 24/*h/day*/
	const days = Math.floor(millisecondDiff / millisecondsInADay)
	console.log("Day of year", days, "for date", date.toISOString())
	return days
}

function radToDeg(rad: number): number {
	return rad * (180 / Math.PI);
}

function degToRad(deg: number): number {
	return deg * (Math.PI / 180);
}
  
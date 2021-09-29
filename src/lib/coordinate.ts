import { Angle } from "./angle"
import { Hemisphere, fromString as hemisphereFromString } from "./hemisphere"


/**
 * A Coordinate as an extension to an angle providing a hemisphere.
 */
export class Coordinate extends Angle {
    readonly hemisphere: Hemisphere

    /**
     * Creates a new Coordinate.
     * @param degree The degrees of the coordinate (positive values only).
     * @param hemisphere The hemisphere in which the coordinate is located.
     */
    constructor(degree: number, hemisphere: Hemisphere) {
        degree = Math.abs(degree)
        super(degree)
        this.hemisphere = hemisphere
    }

    /**
     * Creates a new Coordinate based on the degrees, minutes, seconds and the hemisphere.
     * @param degree The degrees (May be negative).
     * @param minutes The minutes (Positive values only).
     * @param seconds The seconds as double (Positive values only).
     * @param hemisphere The hemisphere in which the coordinate is located.
     */
    static from_deg_min_sec_hemisphere(degree: number, minutes: number, seconds: number, hemisphere): Coordinate {
        degree = Math.abs(degree)
        const angle = super.from_deg_min_sec(degree, minutes, seconds)
        return new Coordinate(angle.valueOf(), hemisphere)
    }

    /**
     * Creates a new Coordinate based on the given string.
     * @param str A string in the form of DD° MM' SS" H.
     */
    static from_str(str: string): Coordinate {
        const angle = Angle.from_str(str)
        const str_split = str.split(' ')
        const hemisphere = hemisphereFromString(str_split[str_split.length-1])
        return new Coordinate(angle.valueOf(), hemisphere)
    }

    /**
     * Converts this Coordinate into a string of the angle followed by the hemisphere.
     * @see Angle toString.
     * @return A string of the form "angle hemisphere", each in its representation.
     */
    toString(): string {
        return `${super.toString()} ${this.hemisphere}`;
    }
}
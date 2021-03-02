/**
 * A hemisphere / cardinal direction.
 */
enum Hemisphere {
  North = 'N',
  East = 'E',
  South = 'S',
  West = 'W',
}

/**
 * An angle as double that can be converted from and to degrees, seconds, minutes
 */
class Angle {
  readonly degree: number

  /**
   * Creates a new angle.
   * @param degree The value of the angle. The value of the angle. Negative values are also allowed
   */
  constructor(degree: number) {
    this.degree = degree
  }

  /**
   * Creates a new angle based on degrees, minutes, seconds.
   * @param degree The degrees (May be negative)
   * @param minutes The minutes (Positive values only)
   * @param seconds The seconds as double (Positive values only)
   */
  static from_deg_min_sec(degree: number, minutes: number, seconds: number): Angle {
    const degree_sum: number = degree + minutes/60 + seconds/3600
    return new Angle(degree_sum)
  }

  /**
   * Converts the angle to a tuple of degrees, minutes and seconds.
   * @return A tuple of the form [degrees, minutes, seconds].
   */
  to_deg_min_sec(): [number, number, number] {
    const degree_int = Math.floor(this.degree)
    const minutes_int = Math.floor((this.degree - degree_int) * 60)
    const seconds = (this.degree - degree_int - minutes_int/60) * 3600
    return [degree_int, minutes_int, seconds]
  }

  valueOf(): number {
    return this.degree
  }

  /**
   * Converts the angle into a string with degrees, minutes and seconds
   * @return A string of the form "degree°minutes'seconds"
   */
  toString(): string {
    const [deg, min, sec]: [number, number, number] = this.to_deg_min_sec()
    return `${deg}°${min}'${sec.toFixed(1)}"`
  }
}

/**
 * A Coordinate as an extension to an angle providing a hemisphere.
 */
class Coordinate extends Angle {
  readonly hemisphere: Hemisphere

  /**
   * Creates a new Coordinate.
   * @param degree The degrees of the coordinate as double.
   * @param hemisphere The hemisphere in which the coordinate is located.
   */
  constructor(degree: number, hemisphere: Hemisphere) {
    degree = Math.abs(degree)
    super(degree)
    this.hemisphere = hemisphere
  }

  /**
   * Creates a new Coordinate based on the degrees, minutes, seconds and the hemisphere.
   * @param degree The degrees (May be negative)
   * @param minutes The minutes (Positive values only)
   * @param seconds The seconds as double (Positive values only)
   * @param hemisphere The hemisphere in which the coordinate is located.
   */
  static from_deg_mim_sec(degree: number, minutes: number, seconds: number, hemisphere): Coordinate {
    degree = Math.abs(degree)
    const angle = super.from_deg_min_sec(degree, minutes, seconds)
    return new Coordinate(angle.valueOf(), hemisphere)
  }

  /**
   * Converts this Coordinate into a string of the angle followed by the hemisphere.
   * @see Angle toString.
   * @return A string of the form "Angle Hemisphere", each in its representation.
   */
  toString(): string {
    return super.toString() + " " + this.hemisphere;
  }
}

class Position {
  /**
   * The latitude.
   */
  readonly lat: Coordinate
  /**
   * The longitude.
   */
  readonly lng: Coordinate

  /**
   * Creates a new Position.
   * @param lat The latitude.
   * @param lng The longitude.
   */
  constructor(lat: Coordinate, lng: Coordinate) {
    this.lat = lat
    this.lng = lng
  }

  /**
   * Converts this position into a string of its coordinates.
   * @return A string in the form "Latitude Longitude" in their representation.
   */
  toString(): string {
    return `${this.lat.toString()} ${this.lng.toString()}`
  }
}

class Sextant {
  readonly measuring_time: Date
  readonly angle: Coordinate
  readonly sun_declination: Coordinate

  constructor(measuring_time: Date, angle: Coordinate, sun_declination: Coordinate) {
    this.measuring_time = measuring_time
    this.angle = angle
    this.sun_declination = sun_declination
  }

  /*calculate_lat(): Coordinate {
    const celestial_equator_height: Coordinate = new Coordinate(this.angle.valueOf() - this.sun_declination.valueOf())
    const lat: Coordinate = new Coordinate(90 - celestial_equator_height.valueOf())
    return lat
  }*/
}


const a = new Coordinate(52.17492764, Hemisphere.North)
console.log(a.toString())
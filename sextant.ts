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
 * An angle as double that can be converted from and to degrees, seconds, minutes.
 */
class Angle {
  readonly degree: number

  /**
   * Creates a new angle.
   * @param degree The value of the angle. The value of the angle. Negative values are also allowed.
   */
  constructor(degree: number) {
    this.degree = degree
  }

  /**
   * Creates a new angle based on degrees, minutes, seconds.
   * @param degree The degrees (May be negative).
   * @param minutes The minutes (Positive values only).
   * @param seconds The seconds as double (Positive values only).
   */
  static from_deg_min_sec(degree: number, minutes: number, seconds: number): Angle {
    const degree_sum: number = degree + minutes/60 + seconds/3600
    return new Angle(degree_sum)
  }

  static get zero(): Angle {
    return new Angle(0)
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
   * Converts the angle into a string with degrees, minutes and seconds.
   * @return A string of the form "degree°minutes'seconds".
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


/**
 * A position on the globe determined by the latitude and longitude.
 */
class Position {
  readonly latitude: Coordinate
  readonly longitude: Coordinate

  /**
   * Creates a new Position.
   * @param latitude The latitude.
   * @param longitude The longitude.
   */
  constructor(latitude: Coordinate, longitude: Coordinate) {
    this.latitude = latitude
    this.longitude = longitude
  }

  /**
   * Converts this position into a string of its coordinates.
   * @return A string in the form "latitude longitude" in their representation.
   */
  toString(): string {
    return `${this.latitude.toString()} ${this.longitude.toString()}`
  }
}


/**
 * A sextant that can determine the position based on a measurement.
 */
class Sextant {
  readonly measuring_time: Date
  readonly measured_angle: Angle
  readonly sun_declination: Angle
  readonly index_error: Angle

  /**
   * Creates a new Sextant.
   * @param measuring_time The time at which the measurement was made.
   * @param measured_angle The measured horizontal angle.
   * @param sun_declination The sun declination of the day on which the measurement was made.
   * @param index_error The index error of the sextant.
   */
  constructor(measuring_time: Date, measured_angle: Angle, sun_declination: Angle, index_error?: Angle) {
    this.measuring_time = measuring_time
    this.measured_angle = measured_angle
    this.sun_declination = sun_declination
    this.index_error = index_error ?? Angle.zero
  }

  /**
   * Calculates the position based on the measurement.
   * @return The calculated position.
   */
  get position(): Position {
    const lat = this.calculate_lat()
    const lng = this.calculate_lng()
    return new Position(lat, lng)
  }

  /**
   * Calculates the latitude based on the measurement.
   * @return The calculated longitude.
   */
  calculate_lat(): Coordinate {
    const corrected_measurement = this.measured_angle.valueOf() + this.index_error.valueOf()
    const celestial_equator_height = corrected_measurement.valueOf() - this.sun_declination.valueOf()
    return new Coordinate(90 - celestial_equator_height.valueOf(), Hemisphere.North)
  }

  /**
   * Calculates the longitude based on the measurement.
   * @return The calculated longitude.
   */
  calculate_lng(): Coordinate {
    // TODO: Implement
    return new Coordinate(0, Hemisphere.West)
  }
}


const measured = Angle.from_deg_min_sec(23, 17, 0)
const sun_decl = Angle.from_deg_min_sec(-17, 56, 0)
const sextant = new Sextant(new Date(Date.now()), measured, sun_decl)
console.log(sextant.position.toString())
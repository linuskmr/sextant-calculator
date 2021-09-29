import { Angle } from "./Angle"
import { Position } from "./Position"
import { Coordinate } from "./Coordinate";
import { Hemisphere } from "./Hemisphere";

/**
 * A sextant that can determine the position based on a measurement.
 */
export class Sextant {
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
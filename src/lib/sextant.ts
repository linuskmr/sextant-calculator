import {Angle} from "./angle"
import {Position} from "./position"
import {Coordinate} from "./coordinate";
import {Hemisphere} from "./hemisphere";

/**
 * A sextant that can determine the position based on a measurement.
 */
export class Sextant {
  readonly datetime: Date
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
    this.datetime = measuring_time
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
    const sunPeakGreenwich = Sextant.toDecimalTime(new Date(2021, 11, 6, 11, 43))
    const sunPeakMeasured = Sextant.toDecimalTime(this.datetime)
    const sunPeakHourDelta = sunPeakMeasured - sunPeakGreenwich

    // The earth rotates once around the sun in 24h. However, our input refer to "gets sun peak before or after
    // Greenwich", so only maximum 12 hours earlier or later.
    // Longitudes are divided into -180° to +180°.
    // So map the hour fraction of 24h to a degree fraction of 180°.
    let degreeDelta = sunPeakHourDelta / 12 * 180
    let hemisphere: Hemisphere
    if (degreeDelta >= 0.0) {
      hemisphere = Hemisphere.East
    } else {
      hemisphere = Hemisphere.West
    }
    degreeDelta = Math.abs(degreeDelta)

    return new Coordinate(degreeDelta, hemisphere)
  }

  static toDecimalTime(date: Date): number {
    return date.getHours() + date.getMinutes()/60 + date.getSeconds()/3600;
  }
}
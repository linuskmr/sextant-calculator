import { Angle } from "./angle";
import { Position } from "./position";
import { Coordinate } from "./coordinate";
import { Hemisphere } from "./hemisphere";

/**
 * A sextant that can determine the position based on a measurement.
 */
export class Sextant {
  /**
   * The time at which the measurement was made.
   */
  readonly measuringTime: Date;

  /**
   * The measured horizontal angle.
   */
  readonly measuredElevation: Angle;

  /**
   * The sun declination of the day on which the measurement was made.
   */
  readonly sunDeclination: Angle;

  /**
   * The index error of the sextant.
   */
  readonly indexError: Angle;

  /**
   * The time at which the sun peaked in Greenwich.
   */
  readonly culminationTimePrimeMeridian: Date;

  /**
   * Creates a new Sextant.
   * @param measuringTime The time at which the measurement was made.
   * @param measuredElevation The measured horizontal angle.
   * @param sunDeclination The sun declination of the day on which the measurement was made.
   * @param culminationTimeGreenwich The time at which the sun peaked in Greenwich.
   * @param indexError The index error of the sextant.
   */
  constructor(
    measuringTime: Date,
    measuredElevation: Angle,
    sunDeclination: Angle,
    culminationTimeGreenwich: Date,
    indexError?: Angle,
  ) {
    this.culminationTimePrimeMeridian = culminationTimeGreenwich
    this.measuringTime = measuringTime;
    this.measuredElevation = measuredElevation;
    this.sunDeclination = sunDeclination;
    this.indexError = indexError ?? Angle.zero;
  }

  /**
   * Calculates the position based on the measurement.
   * @return The calculated position.
   */
  get position(): Position {
    const lat = this.calculateLat();
    const lng = this.calculateLng();
    return new Position(lat, lng);
  }

  /**
   * Calculates the latitude based on the measurement.
   * @return The calculated longitude.
   */
  calculateLat(): Coordinate {
    const corrected_measurement =
      this.measuredElevation.valueOf() - this.indexError.valueOf();
    const celestial_equator_height =
      corrected_measurement.valueOf() - this.sunDeclination.valueOf();
    return new Coordinate(
      90 - celestial_equator_height.valueOf(),
      Hemisphere.North
    );
  }

  /**
   * Calculates the longitude based on the measurement.
   * @return The calculated longitude.
   */
  calculateLng(): Coordinate {
    const sunPeakMeasured = Sextant.toDecimalTime(this.measuringTime);
    const sunPeakHourDelta = sunPeakMeasured - Sextant.toDecimalTime(this.culminationTimePrimeMeridian);

    // The earth rotates once around the sun in 24h. However, our input refer to "gets sun peak before or after
    // Greenwich", so only maximum 12 hours earlier or later.
    // Longitudes are divided into -180° to +180°.
    // So map the hour fraction of 24h to a degree fraction of 180°.
    let degreeDelta = (sunPeakHourDelta / 12) * 180;
    let hemisphere: Hemisphere;
    if (degreeDelta >= 0.0) {
      hemisphere = Hemisphere.East;
    } else {
      hemisphere = Hemisphere.West;
    }
    degreeDelta = Math.abs(degreeDelta);

    return new Coordinate(degreeDelta, hemisphere);
  }

  static toDecimalTime(date: Date): number {
    return date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
  }
}

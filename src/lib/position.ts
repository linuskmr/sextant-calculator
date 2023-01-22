import type { Coordinate } from "./coordinate";
import { Hemisphere } from "./hemisphere";

/**
 * A position on the globe determined by the latitude and longitude.
 */
export class Position {
  readonly latitude: Coordinate;
  readonly longitude: Coordinate;

  /**
   * Creates a new Position.
   * @param latitude The latitude.
   * @param longitude The longitude.
   */
  constructor(latitude: Coordinate, longitude: Coordinate) {
    console.assert(
      latitude.hemisphere == Hemisphere.North ||
        latitude.hemisphere == Hemisphere.South
    );
    console.assert(
      longitude.hemisphere == Hemisphere.West ||
        longitude.hemisphere == Hemisphere.East
    );
    this.latitude = latitude;
    this.longitude = longitude;
  }

  /**
   * Converts this position into a string of its coordinates.
   * @return A string in the form "latitude\nlongitude" in their representation.
   */
  toString(): string {
    return `${this.latitude.toString()}\n${this.longitude.toString()}`;
  }
}

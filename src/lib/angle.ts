/**
 * An angle as double that can be converted from and to degrees, seconds, minutes.
 */
export class Angle {
  readonly angle: number;

  /**
   * Creates a new angle.
   * @param degree The value of the angle in degrees. Negative values are also allowed.
   */
  constructor(degree: number) {
    this.angle = degree;
  }

  /**
   * Creates a new angle based on degrees, minutes, seconds.
   * @param degree The degrees (May be negative).
   * @param minutes The minutes (Positive values only).
   * @param seconds The seconds as double (Positive values only).
   */
  static from_deg_min_sec(
    degree: number,
    minutes: number,
    seconds: number
  ): Angle {
    const degree_sum: number = degree + minutes / 60 + seconds / 3600;
    return new Angle(degree_sum);
  }

  /**
   * Creates a new Angle based on the given string.
   * @param str A string in the form of DD° MM' SS".
   */
  static from_str(str: string): Angle {
    const reg = /(-*\d+)°\s*(\d+)'\s*(\d+)"/;
    const [, degrees, minutes, seconds] = str
      .match(reg)
      .map((n) => parseInt(n));
    return Angle.from_deg_min_sec(degrees, minutes, seconds);
  }

  /**
   * Returns an Angle with zero degrees.
   */
  static get zero(): Angle {
    return new Angle(0);
  }

  /**
   * Converts the angle to a tuple of degrees, minutes and seconds.
   * @return A tuple of the form [degrees, minutes, seconds].
   */
  to_deg_min_sec(): [number, number, number] {
    const degree_int = Math.floor(this.angle);
    const minutes_int = Math.floor((this.angle - degree_int) * 60);
    const seconds = (this.angle - degree_int - minutes_int / 60) * 3600;
    return [degree_int, minutes_int, seconds];
  }

  valueOf(): number {
    return this.angle;
  }

  /**
   * Converts the angle into a string with degrees, minutes and seconds.
   * @return A string of the form "degree° minutes' seconds".
   */
  toString(): string {
    const [deg, min, sec]: [number, number, number] = this.to_deg_min_sec();
    // @ts-ignore
    const deg_str = deg.toString().padStart(2);
    // @ts-ignore
    const min_str = min.toString().padStart(2);
    const sec_numbers = sec.toFixed(1).split(".");
    // @ts-ignore
    const sec_str = sec_numbers[0].padStart(2) + "." + (sec_numbers[1] ?? "0");
    return `${deg_str}° ${min_str}' ${sec_str}"`;
  }

  get degrees(): number {
    return Math.floor(this.angle);
  }

  get minutes(): number {
    return Math.floor((this.angle - this.degrees) * 60);
  }

  get seconds(): number {
    return (this.angle - this.degrees - (this.minutes / 60)) * 3600;
  }
}

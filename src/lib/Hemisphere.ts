/**
 * A hemisphere / cardinal direction.
 */
export enum Hemisphere {
    North = 'N',
    East = 'E',
    South = 'S',
    West = 'W',
}

export function fromString(hemisphere: String): Hemisphere {
    switch (hemisphere) {
        case "North":
        case "N":
            return Hemisphere.North
        case "East":
        case "E":
            return Hemisphere.East
        case "South":
        case "S":
            return Hemisphere.South
        case "West":
        case "W":
            return Hemisphere.East
        default:
            throw TypeError("Invalid hemisphere")
    }
}
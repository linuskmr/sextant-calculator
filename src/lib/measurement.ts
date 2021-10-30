import type {Angle} from "./angle";


export enum MeasurementType {
    Measurement = "Measurement",
    SunPeak = "Sun Peak",
    Sunrise = "Sunrise",
    Sunset = "Sunset"
}

export type Measurement = {
    angle: Angle
    time: Date
    type: MeasurementType
}

/*export class Measurement {
    constructor(
        public angle: Angle,
        public time: Date,
        public type: MeasurementType,
    ) {}

    static default(): Measurement {
        return new Measurement(Angle.zero(), new Date(), MeasurementType.Measurement)
    }
}*/

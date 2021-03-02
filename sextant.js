var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * A hemisphere / cardinal direction.
 */
var Hemisphere;
(function (Hemisphere) {
    Hemisphere["North"] = "N";
    Hemisphere["East"] = "E";
    Hemisphere["South"] = "S";
    Hemisphere["West"] = "W";
})(Hemisphere || (Hemisphere = {}));
/**
 * An angle as double that can be converted from and to degrees, seconds, minutes
 */
var Angle = /** @class */ (function () {
    /**
     * Creates a new angle.
     * @param degree The value of the angle. The value of the angle. Negative values are also allowed
     */
    function Angle(degree) {
        this.degree = degree;
    }
    /**
     * Creates a new angle based on degrees, minutes, seconds.
     * @param degree The degrees (May be negative)
     * @param minutes The minutes (Positive values only)
     * @param seconds The seconds as double (Positive values only)
     */
    Angle.from_deg_min_sec = function (degree, minutes, seconds) {
        var degree_sum = degree + minutes / 60 + seconds / 3600;
        return new Angle(degree_sum);
    };
    /**
     * Converts the angle to a tuple of degrees, minutes and seconds.
     * @return A tuple of the form [degrees, minutes, seconds].
     */
    Angle.prototype.to_deg_min_sec = function () {
        var degree_int = Math.floor(this.degree);
        var minutes_int = Math.floor((this.degree - degree_int) * 60);
        var seconds = (this.degree - degree_int - minutes_int / 60) * 3600;
        return [degree_int, minutes_int, seconds];
    };
    Angle.prototype.valueOf = function () {
        return this.degree;
    };
    /**
     * Converts the angle into a string with degrees, minutes and seconds
     * @return A string of the form "degree°minutes'seconds"
     */
    Angle.prototype.toString = function () {
        var _a = this.to_deg_min_sec(), deg = _a[0], min = _a[1], sec = _a[2];
        return deg + "\u00B0" + min + "'" + sec.toFixed(1) + "\"";
    };
    return Angle;
}());
/**
 * A Coordinate as an extension to an angle providing a hemisphere.
 */
var Coordinate = /** @class */ (function (_super) {
    __extends(Coordinate, _super);
    /**
     * Creates a new Coordinate.
     * @param degree The degrees of the coordinate as double.
     * @param hemisphere The hemisphere in which the coordinate is located.
     */
    function Coordinate(degree, hemisphere) {
        var _this = this;
        degree = Math.abs(degree);
        _this = _super.call(this, degree) || this;
        _this.hemisphere = hemisphere;
        return _this;
    }
    /**
     * Creates a new Coordinate based on the degrees, minutes, seconds and the hemisphere.
     * @param degree The degrees (May be negative)
     * @param minutes The minutes (Positive values only)
     * @param seconds The seconds as double (Positive values only)
     * @param hemisphere The hemisphere in which the coordinate is located.
     */
    Coordinate.from_deg_mim_sec = function (degree, minutes, seconds, hemisphere) {
        degree = Math.abs(degree);
        var angle = _super.from_deg_min_sec.call(this, degree, minutes, seconds);
        return new Coordinate(angle.valueOf(), hemisphere);
    };
    /**
     * Converts this Coordinate into a string of the angle followed by the hemisphere.
     * @see Angle toString.
     * @return A string of the form "Angle Hemisphere", each in its representation.
     */
    Coordinate.prototype.toString = function () {
        return _super.prototype.toString.call(this) + " " + this.hemisphere;
    };
    return Coordinate;
}(Angle));
var Position = /** @class */ (function () {
    /**
     * Creates a new Position.
     * @param lat The latitude.
     * @param lng The longitude.
     */
    function Position(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }
    /**
     * Converts this position into a string of its coordinates.
     * @return A string in the form "Latitude Longitude" in their representation.
     */
    Position.prototype.toString = function () {
        return this.lat.toString() + " " + this.lng.toString();
    };
    return Position;
}());
var Sextant = /** @class */ (function () {
    function Sextant(measuring_time, angle, sun_declination) {
        this.measuring_time = measuring_time;
        this.angle = angle;
        this.sun_declination = sun_declination;
    }
    return Sextant;
}());
var a = new Coordinate(52.17492764, Hemisphere.North);
console.log(a.toString());

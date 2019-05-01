//import { parse } from "url";

// https://stackoverflow.com/questions/2998784/how-to-output-integers-with-leading-zeros-in-javascript
export function pad(num: number, size: number) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

// https://stackoverflow.com/questions/11409895/whats-the-most-elegant-way-to-cap-a-number-to-a-segment
export function clamp(val: number, min: number, max: number) {
    return Math.min(Math.max(val, min), max);
}

// time data in 24 hours
export class Time {
    hours = 0;
    mins = 0;

    constructor(hr: number, mn: number) {
        this.hours = clamp(hr, 0, 23);
        this.mins = clamp(mn, 0, 59);
    }

    to12Hour() {
        let hours = this.hours;
        let mer = "AM";
        if (hours > 12) {
            hours -= 12;
            mer = "PM";
        }
        return pad(hours, 2) + ":" + pad(this.mins, 2) + " " + mer.toUpperCase();
    }

    to24Hour() {
        return pad(this.hours, 2) + ":" + pad(this.mins, 2);
    }
}

export class FastTimeInput {
    public static parse(timeString: string, format?: "24hr" | "12hr") {
        let newTime = "";
        // https://stackoverflow.com/questions/2031085/how-can-i-check-if-string-contains-characters-whitespace-not-just-whitespace
        if (/\S/.test(timeString) || timeString !== "") {
            const t = FastTimeInput.convertInput(timeString);
            if (!format || format === "12hr") {
                newTime = t.to12Hour();
            } else {
                newTime = t.to24Hour();
            }
        }

        return newTime;
    }

    /*
  1p => 1:00 PM
  12p => 12:00 PM
  13p => 1:00 PM
  130p => 1:30 PM

  sungle and double digits:
  1 - 24 => convert to 24 hour

  triple digits:
  130 => 1:30
  125 => 1:25

  quadruple digits:
  0530 => 5:30 // strip trailing zero
  1555 => 15:55


  if pm and hours > 12: hours += 12

  - if no p is present, AM is implied
  */
    public static convertInput(timeString: string) {
        var meridian = this.findMeridian(timeString);

        // strip extra characters
        timeString = timeString.replace(/\D/g, "");

        if (timeString.length == 0) return new Time(0, 0);
        if (timeString.length == 1 || timeString.length == 2) return this.convertSingleAndDouble(timeString, meridian);
        if (timeString.length == 3) return this.convertTriple(timeString, meridian);
        if (timeString.length == 4) return this.convertQuadruple(timeString, meridian);

        return new Time(0, 0);
    }

    // returns am, pm or an empty string if neither is found
    public static findMeridian(timeString: string): "am" | "pm" | null {
        if (timeString.search("pm") !== -1 || timeString.search("p") !== -1) return "pm";
        if (timeString.search("am") !== -1 || timeString.search("a") !== -1) return "am";
        return null;
    }

    public static convertSingleAndDouble(timeString: string, meridian: "am" | "pm" | null) {
        var value = parseInt(timeString) % 24;
        if (meridian === "pm" && value < 12) value += 12;
        return new Time(value % 24, 0);
    }

    /*
  only handles time between 1:01 and 9:99
  */
    public static convertTriple(timeString: string, meridian: "am" | "pm" | null) {
        var hours = parseInt(timeString.substr(0, 1));
        if (meridian === "pm" && hours < 12) hours += 12;

        var mins = parseInt(timeString.substr(1, 3));

        return new Time(hours, mins);
    }

    /*
  ignores p and a
   */
    public static convertQuadruple(timeString: string, meridian: "am" | "pm" | null) {
        var hours = parseInt(timeString.substr(0, 2));
        if (meridian === "pm" && hours < 12) hours += 12;
        if (meridian === "am" && hours > 12) hours -= 12;
        var mins = parseInt(timeString.substr(2, 5));

        return new Time(hours, mins);
    }

    // https://stackoverflow.com/questions/8282266/how-to-prevent-invalid-characters-from-being-typed-into-input-fields
    public static inputFilter(e: any) {
        const inputLength = e.target.value.length;

        // 0-9
        if (e.which > 47 && e.which < 58) {
            return false;
        }

        // https://stackoverflow.com/questions/2353550/how-to-capture-a-backspace-on-the-onkeydown-event/2353562
        // backspace, delete and tab
        if (e.which === 8 || e.which === 46 || e.which === 9) {
            return false;
        }

        let key = e.key.toUpperCase();
        // AMP
        /* ensures that the first charater in the input box can not be any of the allowed letters */
        if ((inputLength > 0 && key === "A") || (inputLength > 0 && key === "P") || (inputLength > 0 && key === "M")) {
            return false;
        }

        // colon :
        /* ensures that the first charater in the input box can not be a colon */
        if (inputLength > 0 && e.key === ":") {
            return false;
        }

        e.preventDefault();
    }
}

export function parse(timeString: string, format?: "24hr" | "12hr"): string {
    return FastTimeInput.parse(timeString, format);
}

export function filterInput(e: any) {
    return FastTimeInput.inputFilter(e);
}

//export default FastTimeInput;

// https://stackoverflow.com/questions/2998784/how-to-output-integers-with-leading-zeros-in-javascript
function pad(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

// https://stackoverflow.com/questions/11409895/whats-the-most-elegant-way-to-cap-a-number-to-a-segment
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

// time data in 24 hours
class Time {
  hours = 0;
  mins = 0;

  constructor(hr, mn) {
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

class FastTimeInput {

  parse = timeText => {
    let newTime = "";
    // https://stackoverflow.com/questions/2031085/how-can-i-check-if-string-contains-characters-whitespace-not-just-whitespace
    if (/\S/.test(timeText) || timeText !== "") {
      const t = this.convertInput(timeText);

      newTime = t.to12Hour();
    }

    return newTime;
  };

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
  convertInput(timeText) {
    var m = this.findAMPM(timeText);

    // strip extra characters
    timeText = timeText.replace(/\D/g, "");
    
    if (timeText.length == 0) return new Time(0, 0, "am");
    if (timeText.length == 1 || timeText.length == 2)
      return this.convertSingleAndDouble(timeText, m);
    if (timeText.length == 3) return this.convertTriple(timeText, m);
    if (timeText.length == 4) return this.convertQuadruple(timeText, m);

    return new Time(0, 0, "am");
  }

  findAMPM(timeText) {
    if (timeText.search("pm") !== -1 || timeText.search("p") !== -1)
      return "pm";
    return "am";
  }

  convertSingleAndDouble(timeText, m) {
    var value = parseInt(timeText) % 24;
    if (m === "pm" && value < 12) value += 12;
    return new Time(value % 24, 0, m);
  }

  /*
  only handles time between 1:01 and 9:99
  */
  convertTriple(timeText, m) {
    var hours = parseInt(timeText.substr(0, 1));
    if (m === "pm" && hours < 12) hours += 12;

    var mins = parseInt(timeText.substr(1, 3));

    return new Time(hours, mins, m);
  }

  /*
  ignores p and a
   */
  convertQuadruple(timeText, m) {
    var hours = parseInt(timeText.substr(0, 2));
    if (m === "pm" && hours < 12) hours += 12;
    if (m === "am" && hours > 12) hours -= 12;
    var mins = parseInt(timeText.substr(2, 5));

    return new Time(hours, mins, m);
  }

  // https://stackoverflow.com/questions/8282266/how-to-prevent-invalid-characters-from-being-typed-into-input-fields
  inputFilter(e) {
    // 0-9
    if (e.which > 47 && e.which < 58) {
      return false;
    }

    // https://stackoverflow.com/questions/2353550/how-to-capture-a-backspace-on-the-onkeydown-event/2353562
    // backspace and delete
    if (e.which === 8 || e.which === 46) {
      return false;
    }

    let key = e.key.toUpperCase();
    // AMP
    if (key === "A" || key === "P" || key === "M") return false;

    // colon :
    if (e.key === ":") {
      return false;
    }

    e.preventDefault();
  }
}

export default FastTimeInput;
import { parse } from "./index";
// import { FastTimeInput } from './fast-time-input';

export function pad(num: number, size: number) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

test("basic", () => {
    expect(parse("130p")).toBe("01:30 PM");
});

test("single digit", () => {
    expect(parse("7")).toBe("07:00 AM");
});

test("double digit", () => {
    expect(parse("11")).toBe("11:00 AM");
});

test("double digit past 12 should be pm", () => {
    expect(parse("13")).toBe("01:00 PM");
});

test("12 by default should be 12::00 PM", () => {
    expect(parse("12")).toBe("12:00 PM");
});

test("12 am should be 00:00 am", () => {
    expect(parse("12a")).toBe("12:00 AM");
});

test("545p should be 05:45 PM", () => {
    expect(parse("545p")).toBe("05:45 PM");
});

test("cap minutes to 59", () => {
    expect(parse("290")).toBe("02:59 AM");
});

test("invalid characters", () => {
    expect(parse("*^#H87h(@H9qp/i|w")).toBe("08:59 PM");
});

test("24 hour time parse to 12 hour format", () => {
    expect(parse("17:00")).toBe("05:00 PM");
});

describe("Parse with format param 24hr", () => {
    test("17p should parse to 17:00", () => {
        expect(parse("17p", "24hr")).toBe("17:00");
    });
    test("5p should parse to 17:00", () => {
        expect(parse("5p", "24hr")).toBe("17:00");
    });

    test("530p should parse to 17:30", () => {
        expect(parse("530p", "24hr")).toBe("17:30");
    });
});

describe("Parse 24 hour format for all hours of the day", () => {
    for( let i = 0; i < 24;i++) {
        const time = pad(i,2)+":00";
        test(time+" should parse to "+time, () => {
            expect(parse(time, "24hr")).toBe(time);
        });
    }
});

describe("Parse 24 hour single and double shortcut format for all hours of the day (24hr output)", () => {
    for( let i = 0; i < 24;i++) {
        const time = pad(i,2)+":00";
        const shortcode = i+"";
        test(shortcode+" should parse to "+time, () => {
            expect(parse(shortcode, "24hr")).toBe(time);
        });
    }
});

describe("Parse 24 hour triple and quadruple shortcut format for all hours of the day (24hr output)", () => {
    for( let i = 0; i < 24;i++) {
        const time = pad(i,2)+":30";
        const shortcode = i+"30";
        test(shortcode+" should parse to "+time, () => {
            expect(parse(shortcode, "24hr")).toBe(time);
        });
    }
});

describe("Parse shortcode single and double with 'p' for all hours of the day (24hr output)", () => {
    for( let i = 0; i < 24;i++) {
        const time = pad((i%12)+12,2)+":00";
        const shortcode = i+"p";

        test(shortcode+" should parse to "+time, () => {
            expect(parse(shortcode, "24hr")).toBe(time);
        });
    }
});

describe("Parse shortcode triple and quadruple with 'p' for all hours of the day (24hr output)", () => {
    for( let i = 0; i < 24;i++) {
        const time = pad((i%12)+12,2)+":30";
        const shortcode = i+"30p";
        test(shortcode+" should parse to "+time, () => {
            expect(parse(shortcode, "24hr")).toBe(time);
        });
    }
});

describe("Parse shortcode single and double with 'a' for all hours of the day (24hr output)", () => {
    for( let i = 0; i < 24;i++) {
        const time = pad((i % 12), 2) + ":00";
        const shortcode = i + "a";

        test(shortcode+" should parse to "+time, () => {
            expect(parse(shortcode, "24hr")).toBe(time);
        });
    }
});

describe("Parse shortcode triple and quadruple with 'a' for all hours of the day (24hr output)", () => {
    for( let i = 0; i < 24;i++) {
        const time = pad((i % 12), 2)+":30";
        const shortcode = i + "30a";
        test(shortcode+" should parse to "+time, () => {
            expect(parse(shortcode, "24hr")).toBe(time);
        });
    }
});

describe("Parse 12 hour format for all hours of the day (12 hour output)", () => {
    for( let i = 0; i < 12;i++) {
        const t = i===0 ? 12 : i;
        const amTime = pad(t,2)+":00 AM";
        test(amTime+" should parse to "+amTime, () => {
            expect(parse(amTime, "12hr")).toBe(amTime);
        });

        const pmTime = pad(t,2)+":00 PM";
        test(pmTime+" should parse to "+pmTime, () => {
            expect(parse(pmTime, "12hr")).toBe(pmTime);
        });
    }
});


describe("Parse 24 hour single and double shortcut format for all hours of the day (12hr output)", () => {
    for( let i = 1; i < 12;i++) {
        const t = i;

        const amExpectedTime = pad(t, 2)+":00 AM";
        const amTime = t + "";
        test(amTime + " should parse to " + amExpectedTime, () => {
            expect(parse(amTime, "12hr")).toBe(amExpectedTime);
        });

        const pmExpectedTime = pad(t, 2)+":00 PM";
        const pmTime = (t + 12) + "";
        test(pmTime+" should parse to "+pmExpectedTime, () => {
            expect(parse(pmTime, "12hr")).toBe(pmExpectedTime);
        });
    }

    test("12 should parse to 12:00 PM", () => {
        expect(parse("12", "12hr")).toBe("12:00 PM");
    });

    test("24 should parse to 12:00 AM", () => {
        expect(parse("24", "12hr")).toBe("12:00 AM");
    });
});

/*
describe("Parse shortcode single and double with 'p' for all hours of the day (12hr output)", () => {
    for( let i = 0; i < 24;i++) {
        const time = pad((i%12)+12,2)+":00";
        const shortcode = i+"p";

        test(shortcode+" should parse to "+time, () => {
            expect(parse(shortcode, "24hr")).toBe(time);
        });
    }
});

describe("Parse shortcode single and double with 'a' for all hours of the day (12hr output)", () => {
    for( let i = 0; i < 24;i++) {
        const time = pad((i%12),2)+":00";
        const shortcode = i+"a";

        test(shortcode+" should parse to "+time, () => {
            expect(parse(shortcode, "24hr")).toBe(time);
        });
    }
});

*/
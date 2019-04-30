import { parse } from "./index";
// import { FastTimeInput } from './fast-time-input';

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
    expect(parse("12a")).toBe("00:00 AM");
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

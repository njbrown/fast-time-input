import * as fti from "../dist/fast-time-input"

test("basic",()=>
{
    expect(fti.parse("130p")).toBe("01:30 PM");
});

test("single digit",()=>
{
    expect(fti.parse("7")).toBe("07:00 AM");
});

test("double digit",()=>
{
    expect(fti.parse("11")).toBe("11:00 AM");
});

test("double digit past 12 should be pm",()=>
{
    expect(fti.parse("13")).toBe("01:00 PM");
});

test("12 by default should be 12::00 PM",()=>
{
    expect(fti.parse("12")).toBe("12:00 PM");
});

test("12 am should be 00:00 am",()=>
{
    expect(fti.parse("12a")).toBe("00:00 PM");
});

test("12 am should be 00:00 am",()=>
{
    expect(fti.parse("545")).toBe("05:45 PM");
});
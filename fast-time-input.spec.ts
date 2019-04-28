import * as fti from "./dist/fast-time-input"

test("basic",()=>
{
    expect(fti.parse("130p")).toBe("01:30 PM");
});
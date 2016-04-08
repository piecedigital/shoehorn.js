var shoehorn = require("./shoehorn");

describe("Testing 'shoehorn.js'", function() {
  it("testing methods", function() {
    expect(shoehorn().trueType( shoehorn().String("foo") )).toBe("String");
    expect(shoehorn().trueType( shoehorn().Bool(true) )).toBe("Boolean");
    expect(shoehorn().trueType( shoehorn().Int(1) )).toBe("Int");
    expect(shoehorn().trueType( shoehorn().Int(1.00) )).toBe("Int");
    expect(shoehorn().trueType( shoehorn().Float(1.1) )).toBe("Float");
    expect(shoehorn().trueType( shoehorn().Object({}) )).toBe("Object");
    expect(shoehorn().trueType( shoehorn().Array([]) )).toBe("Array");
    expect(shoehorn().trueType( shoehorn().Func(function() {}) )).toBe("Function");

    expect(shoehorn().String("foo") ).toBe("foo");
    expect(shoehorn().Bool(true) ).toBe(true);
    expect(shoehorn().Int(1) ).toBe(1);
    expect(shoehorn().Int(1.00) ).toBe(1);
    expect(shoehorn().Float(1.1) ).toBe(1.1);
  });
});

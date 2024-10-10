const Validator = require("../src/validator");

describe("Validator", () => {
  it("should validate required fields", () => {
    const schema = {
      username: [{ method: "required", message: "Username is required." }],
    };
    const validator = new Validator(schema);
    const { isValid, errors } = validator.validate({ username: "" });

    expect(isValid).toBe(false);
    expect(errors.username).toContain("Username is required.");
  });

  it("should validate email format", () => {
    const schema = {
      email: [
        { method: "required", message: "Email is required." },
        { method: "email", message: "Email is not valid." },
      ],
    };
    const validator = new Validator(schema);
    const { isValid, errors } = validator.validate({ email: "invalidemail" });

    expect(isValid).toBe(false);
    expect(errors.email).toContain("Email is not valid.");
  });
});

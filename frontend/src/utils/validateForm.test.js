import { validateForm } from "./validateForm";

describe("validateForm", () => {
  it("returns error if any field is empty", () => {
    expect(validateForm("", "test@example.com", "password123")).toBe(
      "All fields are required."
    );
  });

  it("returns error for invalid email", () => {
    expect(validateForm("John", "invalid-email", "password123")).toBe(
      "Invalid email address."
    );
  });

  it("returns error for short password", () => {
    expect(validateForm("John", "test@example.com", "123")).toBe(
      "Password must be at least 6 characters."
    );
  });

  it("returns null for valid input", () => {
    expect(validateForm("John", "test@example.com", "password123")).toBe(null);
  });
});

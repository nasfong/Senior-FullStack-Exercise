import { formatPhoneNumber, formatDateToCustomString, formatPrice } from "./utils";

describe("Utils Library", () => {
  describe("formatPhoneNumber", () => {
    it("formats a valid phone number correctly", () => {
      const input = "123456789";
      const expectedOutput = "123 456 789";
      expect(formatPhoneNumber(input)).toBe(expectedOutput);
    });

    it("removes non-digit characters and formats the phone number", () => {
      const input = "(123)-456-789";
      const expectedOutput = "123 456 789";
      expect(formatPhoneNumber(input)).toBe(expectedOutput);
    });

    it("returns the original string if it doesn't match the expected pattern", () => {
      const input = "12345";
      expect(formatPhoneNumber(input)).toBe(input);
    });
  });

  describe("formatDateToCustomString", () => {
    it("formats an ISO date string to a custom format", () => {
      const input = new Date("2025-04-08T00:00:00Z");
      const expectedOutput = "8/April/2025";
      expect(formatDateToCustomString(input)).toBe(expectedOutput);
    });
  });

  describe("formatPrice", () => {
    it("formats a number as USD currency", () => {
      const input = 1234.56;
      const expectedOutput = "$1,234.56";
      expect(formatPrice(input)).toBe(expectedOutput);
    });
  });
});
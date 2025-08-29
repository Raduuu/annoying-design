import { describe, it, expect } from "vitest";
import { shiftLastChar } from "../utils/index";

describe('shiftLastChar', () => {
  it("shifts letters by +2", () => {
    expect(shiftLastChar("a")).toBe("c");
    expect(shiftLastChar("y")).toBe("a");
    expect(shiftLastChar("Z")).toBe("B");
  });

  it("leaves non-letters unchanged", () => {
    expect(shiftLastChar(" ")).toBe(" ");
    expect(shiftLastChar("1")).toBe("1");
  });
});
import { describe, expect, it } from "vitest";

import { createConverter } from "../../src/node/createConverter.js";

describe("createConverter", () => {
  const converter = createConverter("test");

  describe("deprecatedLogger", () => {
    it("should log a warning and update the options object", () => {
      const options = { oldOption: "value" };

      converter.deprecatedLogger({
        options,
        old: "oldOption",
        new: "newOption",
      });

      expect(options).toHaveProperty("newOption", "value");
      expect(options).not.toHaveProperty("oldOption");
    });

    it("should handle nested options", () => {
      const options = { old: { nested: "value" } };

      converter.deprecatedLogger({
        options,
        old: "old.nested",
        new: "new.nested",
      });

      expect(options).toHaveProperty("new.nested", "value");
      expect(options.old).not.toHaveProperty("nested");
    });

    it('should not throw an error if "old" option does not exist', () => {
      const options = {};

      converter.deprecatedLogger({
        options,
        old: "oldOption",
        new: "newOption",
      });

      expect(options).not.toHaveProperty("newOption");
    });

    it('should not throw an error if nested "old" option does not exist', () => {
      const options = {};

      converter.deprecatedLogger({
        options,
        old: "oldOption.nested",
        new: "newOption.nested",
      });

      expect(options).not.toHaveProperty("newOption");
    });
  });

  describe("droppedLogger", () => {
    it("should log an error and remove the old option", () => {
      const options = { oldOption: "value" };

      converter.droppedLogger({
        options,
        old: "oldOption",
      });

      expect(options).not.toHaveProperty("oldOption");
    });

    it("should log an error with a new option suggestion", () => {
      const options = { oldOption: "value" };

      converter.droppedLogger({
        options,
        old: "oldOption",
        new: "newOption",
      });

      expect(options).not.toHaveProperty("oldOption");
    });

    it("should log an error with a custom message", () => {
      const options = { oldOption: "value" };

      converter.droppedLogger({
        options,
        old: "oldOption",
        msg: "custom message",
      });

      expect(options).not.toHaveProperty("oldOption");
    });

    it("should handle nested options", () => {
      const options = { old: { nested: "value" } };

      converter.droppedLogger({
        options,
        old: "old.nested",
      });

      expect(options.old).not.toHaveProperty("nested");
    });
  });
});

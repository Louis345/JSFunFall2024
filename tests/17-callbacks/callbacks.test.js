import sinon from "sinon";

import {
  returnAnswer,
  calculate,
  formatString,
  createCallToAction,
  capitalizeArray,
  doubleArray,
  findFirst,
} from "./callback-test-helper.js";

describe("Callbacks", () => {
  describe("00-solving-problems", () => {
    test("should pass the test", () => {
      expect(returnAnswer("test")).toBe("test");
    });
  });
  describe("01-calculate", () => {
    test("should use the callback", () => {
      const funcStr = calculate.toString();
      const matches = funcStr.match(/callback/g) || [];
      expect(matches.length).toBeGreaterThan(1);
    });
    test("should return the result of a callback invoked on two numbers", () => {
      const multiply = (a, b) => {
        return a * b;
      };
      const result = calculate(5, 10, multiply);
      expect(result).toBe(50);
    });
  });
  describe("02-format-string", () => {
    test("should use the callback", () => {
      const funcStr = formatString.toString();
      const matches = funcStr.match(/callback/g) || [];
      expect(matches.length).toBeGreaterThan(1);
    });
    test("should return the result of a callback invoked on two numbers", () => {
      const combine = (string1, string2) => `${string1}${string2}`;
      const result = formatString("cheese", "burger", combine);
      expect(result).toBe("cheeseburger");
    });
  });
  describe("03-link-or-button", () => {
    test('"createCallToAction" should be able to use "createLink", "createButton", and any other function that returns a string as a callback function', () => {
      const createLabel = (text) => {
        return `<label>${text} <input type="checkbox" class="hidden"></label>`;
      };
      // Doing this because I do not know if they will be passing in the callback as the first or second argument, so testing both.
      let html1;
      let html2;
      try {
        html1 = createCallToAction("Sign me up", createLabel).replace("\n", "");
      } catch (err) {}

      try {
        html2 = createCallToAction(createLabel, "Sign me up").replace("\n", "");
      } catch (err) {}
      const expectedHtml =
        '<div>Limited Time: Members Save 30%<br><label>Sign me up <input type="checkbox" class="hidden"></label></div>';
      expect([html1, html2].includes(expectedHtml)).toBe(true);
    });
  });
  describe("04-capitalize-array", () => {
    test("should use a callback", () => {
      const funcStr = capitalizeArray.toString();
      const matches = funcStr.match(/callback/g) || [];
      expect(matches.length).toBeGreaterThan(1);
    });
    test("capitalizes an array of strings using a given callback function", () => {
      const arr = ["hello", "world"];
      const callback = sinon.fake((str) => str.toUpperCase());
      const result = capitalizeArray(arr, callback);

      expect(result).toStrictEqual(["HELLO", "WORLD"]);
      expect(callback.callCount).toBe(arr.length);
      arr.forEach((str, i) => {
        expect(callback.getCall(i).args[0]).toBe(str);
      });
    });

    test("returns an empty array if given an empty array", () => {
      const arr = [];
      const callback = sinon.fake((str) => str.toUpperCase());

      const result = capitalizeArray(arr, callback);

      expect(result).toStrictEqual([]);
      expect(callback.callCount).toBe(0);
    });
  });
  describe("05-double", () => {
    test("should use a callback", () => {
      const funcStr = doubleArray.toString();
      const matches = funcStr.match(/callback/g) || [];
      expect(matches.length).toBeGreaterThan(1);
    });
    test("doubles an array of numbers using a given callback function", () => {
      const arr = [1, 2, 3];
      const callback = sinon.fake((num) => num * 2);

      const result = doubleArray(arr, callback);
      console.log("result", result);

      expect(result).toStrictEqual([2, 4, 6]);
      expect(callback.callCount).toBe(arr.length);
      arr.forEach((num, i) => {
        expect(callback.getCall(i).args[0]).toBe(num);
      });
    });

    test("returns an empty array if given an empty array", () => {
      const arr = [];
      const callback = sinon.fake((num) => num * 2);

      const result = doubleArray(arr, callback);

      expect(result).toStrictEqual([]);
      expect(callback.callCount).toBe(0);
    });
  });
  describe("06-find-first", () => {
    test("should use a callback", () => {
      const funcStr = findFirst.toString();
      const matches = funcStr.match(/callback/g) || [];
      expect(matches.length).toBeGreaterThan(1);
    });
    test("should find the first number in an array that, when passed as an argument into a callback, returns true", () => {
      const isNumberDivisibleByThree = (num) => {
        if (num % 3 === 0) return true;
        else return false;
      };
      const result = findFirst([1, 3, 7, 8, 20], isNumberDivisibleByThree);
      expect(result).toBe(3);
    });
  });
});

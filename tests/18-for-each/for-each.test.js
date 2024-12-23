import { findLowestNumber, generateLinks } from "./for-each-test-helper.js";

describe("ForEach", () => {
  describe("01-lowest-num", () => {
    test('should change the variable "lowestNumber" so that it equals the lowest number in an array of numbers', () => {
      const numbers = [1, 9999999, 4.13, -20];
      expect(findLowestNumber(numbers)).toBe(-20);
    });
    test("should use .forEach()", () => {
      const funcStr = findLowestNumber.toString();
      expect(funcStr).toMatch(/\.forEach/);
    });
  });

  describe("02-generate-links", () => {
    test('"htmlStr" should be a string of <a> tags, with one <a> tag per URL in the "links" array', () => {
      const links = ["http://vanilla-js.com", "https://developer.mozilla.org"];
      const anchors = generateLinks(links);
      expect(typeof anchors).toBe("string");
      expect(anchors).toMatch(/(<a.*){2}/);
      expect(anchors).toMatch(/(.*\a>){2}/);
    });
    test('each href attribute should equal a URL in the "links" array (e.g. <a href="https://url1.com" ...', () => {
      const links = ["http://vanilla-js.com", "https://developer.mozilla.org"];
      const anchors = generateLinks(links);
      expect(anchors).toMatch(/href=("|')?http:\/\/vanilla-js.com/);
      expect(anchors).toMatch(/href=("|')?https:\/\/developer.mozilla.org/);
    });
    test("the text between <a ...> and </a> for each link should look like e.g. 1. https://url1.com and the number should increment (HINT JavaScript starts with 0 instead of 1)", () => {
      const links = ["http://vanilla-js.com", "https://developer.mozilla.org"];
      const anchors = generateLinks(links);
      expect(anchors).toMatch(/>\s?2\.? https:\/\/developer.mozilla.org\s?</);
      expect(anchors).toMatch(/>\s?2\.? https:\/\/developer.mozilla.org\s?</);
    });
    test("should use .forEach()", () => {
      const funcStr = generateLinks.toString();
      expect(funcStr).toMatch(/\.forEach/);
    });
  });
});

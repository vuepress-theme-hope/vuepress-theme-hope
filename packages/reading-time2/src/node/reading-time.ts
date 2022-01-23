import type { ReadingTime } from "../shared";

/**
 * Extract Latin words from content
 */
export const getWords = (content: string): RegExpMatchArray =>
  content.match(/[\w\d\s,.\u00C0-\u024F]+/giu) || [];

/**
 * Extract Chinese Characters from content
 */
export const getChinese = (content: string): RegExpMatchArray =>
  content.match(/[\u4E00-\u9FD5]/gu) || [];

/**
 * Get word number of given string
 */
export const getWordNumber = (content: string): number =>
  getWords(content).reduce<number>(
    (accumulator, word) =>
      accumulator + (word.trim() === "" ? 0 : word.trim().split(/\s+/u).length),
    0
  ) + getChinese(content).length;

/**
 * Get reading time info
 */
export const getReadingTime = (
  content: string,
  wordsPerMinute = 300
): ReadingTime => {
  const words = getWordNumber(content || "");

  return {
    minutes: Math.round((words / wordsPerMinute) * 100) / 100,
    words,
  };
};

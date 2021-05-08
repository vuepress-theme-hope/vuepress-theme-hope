import { ReadingTime } from "../types";

export const getWords = (data: string): RegExpMatchArray =>
  data.match(/[\w\d\s\u00C0-\u024F]+/giu) || [];

export const getChinese = (data: string): RegExpMatchArray =>
  data.match(/[\u4E00-\u9FA5]/gu) || [];

export const getWordNumber = (data: string): number =>
  getWords(data).reduce<number>(
    (accumulator, word) =>
      accumulator + (word.trim() === "" ? 0 : word.trim().split(/\s+/u).length),
    0
  ) + getChinese(data).length;

export const readingTime = (
  data: string,
  wordsPerMinute = 300
): ReadingTime => {
  const words = getWordNumber(data || "");

  return {
    minutes: Math.round((words / wordsPerMinute) * 100) / 100,
    words,
  };
};

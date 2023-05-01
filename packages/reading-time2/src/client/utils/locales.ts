import {
  type ReadingTime,
  type ReadingTimeLocaleData,
} from "../../shared/index.js";

export const getReadingTimeLocale = (
  readingTime: ReadingTime,
  locale: ReadingTimeLocaleData
): { time: string; words: string } => {
  const { minutes, words } = readingTime;
  const { less1Minute, word, time } = locale;

  return {
    time:
      minutes < 1
        ? less1Minute
        : time.replace("$time", Math.round(minutes).toString()),
    words: word.replace("$word", words.toString()),
  };
};

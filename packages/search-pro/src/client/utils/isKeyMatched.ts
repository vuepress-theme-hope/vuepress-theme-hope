import { searchProHotKeys } from "../define.js";

export const isKeyMatched = (event: KeyboardEvent): boolean =>
  searchProHotKeys.some((item) => {
    const {
      key,
      ctrl = false,
      shift = false,
      alt = false,
      meta = false,
    } = item;

    return (
      key === event.key &&
      ctrl === event.ctrlKey &&
      shift === event.shiftKey &&
      alt === event.altKey &&
      meta === event.metaKey
    );
  });

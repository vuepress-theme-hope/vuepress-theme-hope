export const watchDarkTheme = (
  callback: (isDarkTheme: boolean) => void
): (() => void) => {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const listener = (event: MediaQueryListEvent): void =>
    callback(event.matches);

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", listener);

  callback(isDarkMode);

  return (): void => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", listener);
  };
};

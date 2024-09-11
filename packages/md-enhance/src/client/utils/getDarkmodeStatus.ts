export const getDarkmodeStatus = (): boolean => {
  const html = document.documentElement;

  return (
    html.classList.contains("dark") ||
    html.getAttribute("data-theme") === "dark"
  );
};

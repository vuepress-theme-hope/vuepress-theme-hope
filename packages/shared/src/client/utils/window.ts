export const getSize = (): Record<
  "width" | "height" | "left" | "top",
  number
> => {
  const { availWidth, availHeight } = screen;
  const { screenLeft, screenTop, innerWidth, innerHeight } = window;
  const width = Math.max(availWidth / 2, 600);
  const height = Math.max(availHeight / 2, 400);

  return {
    width,
    height,
    left: screenLeft + innerWidth / 2 - width / 2,
    top: screenTop + innerHeight / 2 - height / 2,
  };
};

export const openPopupWindow = (
  link: string,
  target = "_blank",
  features = ["resizable", "status"],
): void => {
  const { width, height, left, top } = getSize();

  window
    .open(
      link,
      target,
      `width=${width},height=${height},left=${left},top=${top},${features.join(
        ",",
      )}`,
    )
    ?.focus?.();
};

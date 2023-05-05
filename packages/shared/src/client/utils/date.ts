export const getDate = (
  input: Date | string | number | undefined | null = ""
): Date | null => {
  if (input) {
    if (typeof input === "number") return new Date(input);

    const date = Date.parse(input.toString());

    if (!Number.isNaN(date)) return new Date(date);
  }

  return null;
};

export const getMetaContent = (name: string): string | null =>
  document
    .querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
    ?.getAttribute("content") ?? null;

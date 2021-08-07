export default class Color {
  constructor(
    public type: "hex" | "rgb",
    public red: number,
    public green: number,
    public blue: number,
    public alpha = 1
  ) {}

  public static fromHex(color: string): Color {
    const parseHex = (colorString: string): number => parseInt(colorString, 16);
    const parseAlpha = (colorString: string, total: number): number =>
      Math.round((parseHex(colorString) * 100) / total) / 100;

    if (color.length === 4)
      return new Color(
        "hex",
        parseHex(color[1]) * 17,
        parseHex(color[2]) * 17,
        parseHex(color[3]) * 17
      );

    if (color.length === 5)
      return new Color(
        "hex",
        parseHex(color[1]) * 17,
        parseHex(color[2]) * 17,
        parseHex(color[3]) * 17,
        parseAlpha(color[4], 15)
      );

    if (color.length === 7)
      return new Color(
        "hex",
        parseHex(color.substring(1, 3)),
        parseHex(color.substring(3, 5)),
        parseHex(color.substring(5, 7))
      );

    return new Color(
      "hex",
      parseHex(color.substring(1, 3)),
      parseHex(color.substring(3, 5)),
      parseHex(color.substring(5, 7)),
      parseAlpha(color.substring(7, 9), 255)
    );
  }

  // From RGB or RGBA
  public static fromRGB(color: string): Color {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const RGBAPattern = /rgba\((.+)?,(.+)?,(.+)?,(.+)?\)/u;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const RGBPattern = /rgb\((.+)?,(.+)?,(.+)?\)/u;
    const fromRGB = (colorString: string): number =>
      colorString.includes("%")
        ? (Number(
            colorString.trim().substring(0, colorString.trim().length - 1)
          ) /
            100) *
            256 -
          1
        : Number(colorString.trim());

    const rgbaResult = RGBAPattern.exec(color);
    if (rgbaResult)
      return new Color(
        "rgb",
        fromRGB(rgbaResult[1]),
        fromRGB(rgbaResult[2]),
        fromRGB(rgbaResult[3]),
        Number(rgbaResult[4] || 1)
      );

    const rgbResult = RGBPattern.exec(color);
    if (rgbResult)
      return new Color(
        "rgb",
        fromRGB(rgbResult[1]),
        fromRGB(rgbResult[2]),
        fromRGB(rgbResult[3])
      );

    throw new Error(`Can not handle color: ${color}`);
  }

  public static getColor(colorString: string): Color {
    if (colorString.startsWith("#")) return this.fromHex(colorString);

    return this.fromRGB(colorString);
  }

  public toString(): string {
    if (this.type === "hex" && this.alpha === 1) {
      const toHex = (color: number): string =>
        color < 10
          ? color.toString()
          : color === 10
          ? "a"
          : color === 11
          ? "b"
          : color === 12
          ? "c"
          : color === 13
          ? "d"
          : color === 14
          ? "e"
          : "f";

      if (this.red % 17 === 0 && this.green % 17 === 0 && this.blue % 17 === 0)
        return `#${toHex(this.red / 17)}${toHex(this.green / 17)}${toHex(
          this.blue / 17
        )}`;

      const getHex = (color: number): string =>
        toHex((color - (color % 16)) / 16) + toHex(color % 16);

      return `#${getHex(this.red)}${getHex(this.green)}${getHex(this.blue)}`;
    }

    return this.alpha === 1
      ? `rgb(${this.red},${this.green},${this.blue})`
      : `rgba(${this.red},${this.green},${this.blue},${this.alpha})`;
  }

  public adjust(
    item: "red" | "green" | "blue" | "alpha",
    amount: number
  ): void {
    const result = Math.round(this[item] * amount);

    if (item === "alpha") this.alpha = result < 0 ? 0 : result > 1 ? 1 : result;
    else this[item] = result < 0 ? 0 : result > 255 ? 255 : result;
  }

  public darken(amount: number): Color {
    this.adjust("red", 1 - amount);
    this.adjust("green", 1 - amount);
    this.adjust("blue", 1 - amount);

    return this;
  }

  public lighten(amount: number): Color {
    this.adjust("red", 1 + amount);
    this.adjust("green", 1 + amount);
    this.adjust("blue", 1 + amount);

    return this;
  }
}

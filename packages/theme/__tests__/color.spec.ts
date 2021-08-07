// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Color from "../utils/color.ts";

describe("colorTest", () => {
  it("should handle short HEX color string", () => {
    const white = Color.getColor("#fff");
    expect(white.red).toEqual(255);
    expect(white.green).toEqual(255);
    expect(white.blue).toEqual(255);
    expect(white.alpha).toEqual(1);
    expect(white.toString()).toEqual("#fff");

    const black = Color.getColor("#000");
    expect(black.red).toEqual(0);
    expect(black.green).toEqual(0);
    expect(black.blue).toEqual(0);
    expect(black.alpha).toEqual(1);
    expect(black.toString()).toEqual("#000");

    const ffff = Color.getColor("#ffff");
    expect(ffff.red).toEqual(255);
    expect(ffff.green).toEqual(255);
    expect(ffff.blue).toEqual(255);
    expect(ffff.alpha).toEqual(1);
    expect(ffff.toString()).toEqual("#fff");

    const $5acf = Color.getColor("#5acf");

    expect($5acf.red).toEqual(85);
    expect($5acf.green).toEqual(170);
    expect($5acf.blue).toEqual(204);
    expect($5acf.alpha).toEqual(1);
    expect($5acf.toString()).toEqual("#5ac");
  });

  it("should handle long HEX color string", () => {
    const white = Color.getColor("#ffffff");
    expect(white.red).toEqual(255);
    expect(white.green).toEqual(255);
    expect(white.blue).toEqual(255);
    expect(white.alpha).toEqual(1);
    expect(white.toString()).toEqual("#fff");

    const black = Color.getColor("#000000");
    expect(black.red).toEqual(0);
    expect(black.green).toEqual(0);
    expect(black.blue).toEqual(0);
    expect(black.alpha).toEqual(1);
    expect(black.toString()).toEqual("#000");

    const ffffffff = Color.getColor("#ffffffff");
    expect(ffffffff.red).toEqual(255);
    expect(ffffffff.green).toEqual(255);
    expect(ffffffff.blue).toEqual(255);
    expect(ffffffff.alpha).toEqual(1);
    expect(ffffffff.toString()).toEqual("#fff");

    const $00000000 = Color.getColor("#00000000");

    expect($00000000.red).toEqual(0);
    expect($00000000.green).toEqual(0);
    expect($00000000.blue).toEqual(0);
    expect($00000000.alpha).toEqual(0);
    expect($00000000.toString()).toEqual("rgba(0,0,0,0)");

    const $0a53cc = Color.getColor("#0a53cc");

    expect($0a53cc.red).toEqual(10);
    expect($0a53cc.green).toEqual(83);
    expect($0a53cc.blue).toEqual(204);
    expect($0a53cc.alpha).toEqual(1);
    expect($0a53cc.toString()).toEqual("#0a53cc");

    const $808080 = Color.getColor("#808080");

    expect($808080.red).toEqual(128);
    expect($808080.green).toEqual(128);
    expect($808080.blue).toEqual(128);
    expect($808080.alpha).toEqual(1);
    expect($808080.toString()).toEqual("#808080");
  });

  it("should handle rgb", () => {
    const a = Color.getColor("rgb(85,170,204)");
    expect(a.red).toEqual(85);
    expect(a.green).toEqual(170);
    expect(a.blue).toEqual(204);
    expect(a.alpha).toEqual(1);

    const b = Color.getColor("rgb(85 , 170 ,204 )");
    expect(b.red).toEqual(85);
    expect(b.green).toEqual(170);
    expect(b.blue).toEqual(204);
    expect(b.alpha).toEqual(1);

    const c = Color.getColor("rgb( 85 ,170 , 204)");
    expect(c.red).toEqual(85);
    expect(c.green).toEqual(170);
    expect(c.blue).toEqual(204);
    expect(c.alpha).toEqual(1);
  });

  it("should handle rgba", () => {
    const a = Color.getColor("rgba(85,170,204,0.1)");
    expect(a.red).toEqual(85);
    expect(a.green).toEqual(170);
    expect(a.blue).toEqual(204);
    expect(a.alpha).toEqual(0.1);

    const b = Color.getColor("rgba(85 , 170 ,204, 1 )");
    expect(b.red).toEqual(85);
    expect(b.green).toEqual(170);
    expect(b.blue).toEqual(204);
    expect(b.alpha).toEqual(1);

    const c = Color.getColor("rgba( 85 ,170 , 204, .3)");
    expect(c.red).toEqual(85);
    expect(c.green).toEqual(170);
    expect(c.blue).toEqual(204);
    expect(c.alpha).toEqual(0.3);
  });

  it("should darken color", () => {
    const a = Color.getColor("#3c5dc2").darken(0.1);
    expect(a.toString()).toEqual("#3654af");
  });
});

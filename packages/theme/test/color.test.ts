import { describe, it } from "mocha";
import Color from "../util/color";
import { expect } from "chai";

describe("colorTest", () => {
  it("should handle short HEX color string", () => {
    const white = Color.getColor("#fff");
    expect(white.red).to.be.equal(255);
    expect(white.green).to.be.equal(255);
    expect(white.blue).to.be.equal(255);
    expect(white.alpha).to.be.equal(1);
    expect(white.toString()).to.be.equal("#fff");

    const black = Color.getColor("#000");
    expect(black.red).to.be.equal(0);
    expect(black.green).to.be.equal(0);
    expect(black.blue).to.be.equal(0);
    expect(black.alpha).to.be.equal(1);
    expect(black.toString()).to.be.equal("#000");

    const ffff = Color.getColor("#ffff");
    expect(ffff.red).to.be.equal(255);
    expect(ffff.green).to.be.equal(255);
    expect(ffff.blue).to.be.equal(255);
    expect(ffff.alpha).to.be.equal(1);
    expect(ffff.toString()).to.be.equal("#fff");

    const $5acf = Color.getColor("#5acf");

    expect($5acf.red).to.be.equal(85);
    expect($5acf.green).to.be.equal(170);
    expect($5acf.blue).to.be.equal(204);
    expect($5acf.alpha).to.be.equal(1);
    expect($5acf.toString()).to.be.equal("#5ac");
  });

  // eslint-disable-next-line max-statements
  it("should handle long HEX color string", () => {
    const white = Color.getColor("#ffffff");
    expect(white.red).to.be.equal(255);
    expect(white.green).to.be.equal(255);
    expect(white.blue).to.be.equal(255);
    expect(white.alpha).to.be.equal(1);
    expect(white.toString()).to.be.equal("#fff");

    const black = Color.getColor("#000000");
    expect(black.red).to.be.equal(0);
    expect(black.green).to.be.equal(0);
    expect(black.blue).to.be.equal(0);
    expect(black.alpha).to.be.equal(1);
    expect(black.toString()).to.be.equal("#000");

    const ffffffff = Color.getColor("#ffffffff");
    expect(ffffffff.red).to.be.equal(255);
    expect(ffffffff.green).to.be.equal(255);
    expect(ffffffff.blue).to.be.equal(255);
    expect(ffffffff.alpha).to.be.equal(1);
    expect(ffffffff.toString()).to.be.equal("#fff");

    const $00000000 = Color.getColor("#00000000");

    expect($00000000.red).to.be.equal(0);
    expect($00000000.green).to.be.equal(0);
    expect($00000000.blue).to.be.equal(0);
    expect($00000000.alpha).to.be.equal(0);
    expect($00000000.toString()).to.be.equal("rgba(0,0,0,0)");

    const $0a53cc = Color.getColor("#0a53cc");

    expect($0a53cc.red).to.be.equal(10);
    expect($0a53cc.green).to.be.equal(83);
    expect($0a53cc.blue).to.be.equal(204);
    expect($0a53cc.alpha).to.be.equal(1);
    expect($0a53cc.toString()).to.be.equal("#0a53cc");

    const $808080 = Color.getColor("#808080");

    expect($808080.red).to.be.equal(128);
    expect($808080.green).to.be.equal(128);
    expect($808080.blue).to.be.equal(128);
    expect($808080.alpha).to.be.equal(1);
    expect($808080.toString()).to.be.equal("#808080");
  });

  it("should handle rgb", () => {
    const a = Color.getColor("rgb(85,170,204)");
    expect(a.red).to.be.equal(85);
    expect(a.green).to.be.equal(170);
    expect(a.blue).to.be.equal(204);
    expect(a.alpha).to.be.equal(1);

    const b = Color.getColor("rgb(85 , 170 ,204 )");
    expect(b.red).to.be.equal(85);
    expect(b.green).to.be.equal(170);
    expect(b.blue).to.be.equal(204);
    expect(b.alpha).to.be.equal(1);

    const c = Color.getColor("rgb( 85 ,170 , 204)");
    expect(c.red).to.be.equal(85);
    expect(c.green).to.be.equal(170);
    expect(c.blue).to.be.equal(204);
    expect(c.alpha).to.be.equal(1);
  });

  it("should handle rgba", () => {
    const a = Color.getColor("rgba(85,170,204,0.1)");
    expect(a.red).to.be.equal(85);
    expect(a.green).to.be.equal(170);
    expect(a.blue).to.be.equal(204);
    expect(a.alpha).to.be.equal(0.1);

    const b = Color.getColor("rgba(85 , 170 ,204, 1 )");
    expect(b.red).to.be.equal(85);
    expect(b.green).to.be.equal(170);
    expect(b.blue).to.be.equal(204);
    expect(b.alpha).to.be.equal(1);

    const c = Color.getColor("rgba( 85 ,170 , 204, .3)");
    expect(c.red).to.be.equal(85);
    expect(c.green).to.be.equal(170);
    expect(c.blue).to.be.equal(204);
    expect(c.alpha).to.be.equal(0.3);
  });

  it("should darken color", () => {
    const a = Color.getColor("#3c5dc2").darken(0.1);
    expect(a.toString()).to.be.equal("#3654af");
  });
});

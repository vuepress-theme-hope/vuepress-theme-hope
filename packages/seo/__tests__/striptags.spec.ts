import { StateMachine, striptags } from "../src/node/stripTags";

const ExampleText = `<atag someattr="value">some text<btag>more text</btag></atag>`;

const WantWhenUsingDefault = "some textmore text";

describe("StateMachine", () => {
  it("defaults sanity check", () => {
    const machine = new StateMachine();

    const got = ExampleText.split(/(?= )/g)
      .map((partial) => machine.consume(partial))
      .join("");

    expect(got).toEqual(WantWhenUsingDefault);
  });
});

describe("striptags", () => {
  it("defaults sanity check", () => {
    const got = striptags(ExampleText);

    expect(got).toEqual(WantWhenUsingDefault);
  });
});

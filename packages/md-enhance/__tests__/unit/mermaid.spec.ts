import MarkdownIt = require("markdown-it");
import mermaid from "../../src/node/markdown-it/mermaid";

const demo = `flowchart TB
    c1-->a2
    subgraph one
    a1-->a2
    end
    subgraph two
    b1-->b2
    end
    subgraph three
    c1-->c2
    end
    one --> two
    three --> two
    two --> c2`;

describe("mermaid", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(mermaid);

  it("Should render ```mermaid", () => {
    const renderResult = markdownIt.render(`
\`\`\`mermaid
${demo}
\`\`\`
`);

    expect(renderResult).toMatch(
      /<Mermaid id="mermaid.*?" data-code=".*?"><\/Mermaid>/
    );
    expect(renderResult).toMatchSnapshot();
  });

  it("Shoud not render", () => {
    expect(
      markdownIt.render(`
${demo}
`)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
\`\`\`md
${demo}
\`\`\`
`)
    ).toMatchSnapshot();
  });

  it("Should render ```sequence", () => {
    const renderResult = markdownIt.render(`
\`\`\`sequence
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?
\`\`\`
`);

    expect(renderResult).toMatch(
      /<Mermaid id="mermaid.*?" data-code="sequenceDiagram.*?"><\/Mermaid>/
    );
    expect(renderResult).toMatchSnapshot();
  });

  it("Should render ```class", () => {
    const renderResult = markdownIt.render(`
\`\`\`class
class Square~Shape~{
    int id
    List~int~ position
    setPoints(List~int~ points)
    getPoints() List~int~
}

Square : -List~string~ messages
Square : +setMessages(List~string~ messages)
Square : +getMessages() List~string~
\`\`\`
`);

    expect(renderResult).toMatch(
      /<Mermaid id="mermaid.*?" data-code="classDiagram.*?"><\/Mermaid>/
    );
    expect(renderResult).toMatchSnapshot();
  });

  it("Should render ```state", () => {
    const renderResult = markdownIt.render(`
\`\`\`state
[*] --> Active

state Active {
    [*] --> NumLockOff
    NumLockOff --> NumLockOn : EvNumLockPressed
    NumLockOn --> NumLockOff : EvNumLockPressed
    --
    [*] --> CapsLockOff
    CapsLockOff --> CapsLockOn : EvCapsLockPressed
    CapsLockOn --> CapsLockOff : EvCapsLockPressed
    --
    [*] --> ScrollLockOff
    ScrollLockOff --> ScrollLockOn : EvScrollLockPressed
    ScrollLockOn --> ScrollLockOff : EvScrollLockPressed
}
\`\`\`
`);

    expect(renderResult).toMatch(
      /<Mermaid id="mermaid.*?" data-code="stateDiagram-v2.*?"><\/Mermaid>/
    );
    expect(renderResult).toMatchSnapshot();
  });

  it("Should render ```er", () => {
    const renderResult = markdownIt.render(`
\`\`\`er
CAR ||--o{ NAMED-DRIVER : allows
CAR {
    string registrationNumber
    string make
    string model
}
PERSON ||--o{ NAMED-DRIVER : is
PERSON {
    string firstName
    string lastName
    int age
}
\`\`\`
`);

    expect(renderResult).toMatch(
      /<Mermaid id="mermaid.*?" data-code="erDiagram.*?"><\/Mermaid>/
    );
    expect(renderResult).toMatchSnapshot();
  });

  it("Should render ```journey", () => {
    const renderResult = markdownIt.render(`
\`\`\`journey
title My working day
section Go to work
  Make tea: 5: Me
  Go upstairs: 3: Me
  Do work: 1: Me, Cat
section Go home
  Go downstairs: 5: Me
  Sit down: 5: Me
\`\`\`
`);

    expect(renderResult).toMatch(
      /<Mermaid id="mermaid.*?" data-code="journey.*?"><\/Mermaid>/
    );
    expect(renderResult).toMatchSnapshot();
  });

  it("Should render ```gantt", () => {
    const renderResult = markdownIt.render(`
\`\`\`gantt
dateFormat  YYYY-MM-DD
title       Adding GANTT diagram functionality to mermaid
excludes    weekends
%% (\`excludes\` accepts specific dates in YYYY-MM-DD format, days of the week ("sunday") or "weekends", but not the word "weekdays".)

section A section
Completed task            :done,    des1, 2014-01-06,2014-01-08
Active task               :active,  des2, 2014-01-09, 3d
Future task               :         des3, after des2, 5d
Future task2              :         des4, after des3, 5d

section Critical tasks
Completed task in the critical line :crit, done, 2014-01-06,24h
Implement parser and jison          :crit, done, after des1, 2d
Create tests for parser             :crit, active, 3d
Future task in critical line        :crit, 5d
Create tests for renderer           :2d
Add to mermaid                      :1d

section Documentation
Describe gantt syntax               :active, a1, after des1, 3d
Add gantt diagram to demo page      :after a1  , 20h
Add another diagram to demo page    :doc1, after a1  , 48h

section Last section
Describe gantt syntax               :after doc1, 3d
Add gantt diagram to demo page      :20h
Add another diagram to demo page    :48h
\`\`\`
`);

    expect(renderResult).toMatch(
      /<Mermaid id="mermaid.*?" data-code="gantt.*?"><\/Mermaid>/
    );
    expect(renderResult).toMatchSnapshot();
  });

  it("Should render ```pie", () => {
    const renderResult = markdownIt.render(`
\`\`\`pie
title What Voldemort doesn't have?
  "FRIENDS" : 2
  "FAMILY" : 3
  "NOSE" : 45
\`\`\`
`);

    expect(renderResult).toMatch(
      /<Mermaid id="mermaid.*?" data-code="pie.*?"><\/Mermaid>/
    );
    expect(renderResult).toMatchSnapshot();
  });
});

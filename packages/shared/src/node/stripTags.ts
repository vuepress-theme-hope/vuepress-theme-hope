const TAG_START = "<";
const TAG_END = ">";

const ENCODED_TAG_START = "&lt;";
const ENCODED_TAG_END = "&gt;";

type SpaceCharacter = " " | "\n" | "\r" | "\t";

const isSpace = (character: string): character is SpaceCharacter =>
  character === " " ||
  character === "\n" ||
  character === "\r" ||
  character === "\t";

type QuoteCharacter = '"' | "'";

const isQuote = (character: string): character is QuoteCharacter =>
  character === '"' || character === "'";

export type StateTransitionFunction = (next: State) => void;

export interface State {
  consume(character: string, transition: StateTransitionFunction): string;
}

type InPlaintextStateTransitionFunction = (next: InTagNameState) => void;

export class InPlaintextState implements State {
  consume(
    character: string,
    transition: InPlaintextStateTransitionFunction
  ): string {
    if (character === TAG_START) {
      transition(new InTagNameState());

      return "";
    }

    return character;
  }
}

export const enum TagMode {
  allowed,
  disallowed,
}

type InTagNameStateTransitionFunction = (
  next:
    | InPlaintextState
    | InTagState<TagMode.allowed>
    | InTagState<TagMode.disallowed>
    | InCommentState
) => void;

export class InTagNameState implements State {
  private nameBuffer = "";

  consume(
    character: string,
    transition: InTagNameStateTransitionFunction
  ): string {
    if (this.nameBuffer.length === 0) {
      if (isSpace(character)) {
        transition(new InPlaintextState());

        return "<" + character;
      }

      if (character === "/") return "";
    }

    if (isSpace(character)) {
      transition(new InTagState(TagMode.disallowed));

      return "";
    }

    if (character === TAG_START) {
      this.nameBuffer += ENCODED_TAG_START;

      return "";
    }

    if (character === TAG_END) {
      transition(new InPlaintextState());

      return "";
    }

    if (character === "-" && this.nameBuffer === "!-") {
      transition(new InCommentState());

      return "";
    }

    this.nameBuffer += character;

    return "";
  }
}

type InTagStateTransitionFunction<T extends TagMode> = (
  next: InPlaintextState | InQuotedStringInTagState<T>
) => void;

export class InTagState<T extends TagMode> implements State {
  constructor(public readonly mode: T) {}

  consume(
    character: string,
    transition: InTagStateTransitionFunction<T>
  ): string {
    if (character === TAG_END) transition(new InPlaintextState());
    else if (isQuote(character))
      transition(new InQuotedStringInTagState(this.mode, character));

    if (this.mode === TagMode.disallowed) return "";

    if (character === TAG_START) return ENCODED_TAG_START;

    return character;
  }
}

type InQuotedStringInTagStateTransitionFunction<T extends TagMode> = (
  next: InTagState<T>
) => void;

export class InQuotedStringInTagState<T extends TagMode> implements State {
  constructor(
    public readonly mode: T,
    public readonly quoteCharacter: QuoteCharacter
  ) {}

  consume(
    character: string,
    transition: InQuotedStringInTagStateTransitionFunction<T>
  ): string {
    if (character === this.quoteCharacter)
      transition(new InTagState(this.mode));

    if (this.mode === TagMode.disallowed) return "";

    if (character === TAG_START) return ENCODED_TAG_START;
    if (character === TAG_END) return ENCODED_TAG_END;

    return character;
  }
}

type InCommentStateTransitionFunction = (next: InPlaintextState) => void;

export class InCommentState implements State {
  private consecutiveHyphens = 0;

  consume(
    character: string,
    transition: InCommentStateTransitionFunction
  ): string {
    if (character === ">" && this.consecutiveHyphens >= 2)
      transition(new InPlaintextState());
    else if (character === "-") this.consecutiveHyphens++;
    else this.consecutiveHyphens = 0;

    return "";
  }
}

export class StateMachine {
  private state: State;

  private transitionFunction: StateTransitionFunction;

  constructor() {
    this.state = new InPlaintextState();

    this.transitionFunction = (next: State): void => {
      this.state = next;
    };
  }

  public consume(text: string): string {
    let outputBuffer = "";

    for (const character of text)
      outputBuffer += this.state.consume(character, this.transitionFunction);

    return outputBuffer;
  }
}

export const stripTags = (text = ""): string =>
  text ? new StateMachine().consume(text) : "";

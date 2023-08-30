/* eslint-disable @typescript-eslint/naming-convention */
import MarkdownIt from "markdown-it";
import { describe, expect, it } from "vitest";

import { mdSandpack } from "../../src/node/markdown-it/sandpack/index.js";

const decodeFiles = (content: string): Record<string, string> =>
  JSON.parse(
    Buffer.from(decodeURIComponent(content), "base64").toString(),
  ) as Record<string, string>;

const getTemplate = (renderResult: string): string | null => {
  const result = renderResult.match(/template="(.*?)"/s);

  if (!result) return null;

  return result[1];
};

const getFiles = (renderResult: string): Record<string, string> | null => {
  const result = renderResult.match(/files="(.*?)"/s);

  if (!result) return null;

  return decodeFiles(result[1]);
};

const getOptions = (renderResult: string): Record<string, unknown> | null => {
  const result = renderResult.match(/options="(.*?)"/s);

  if (!result) return null;

  return JSON.parse(decodeURIComponent(result[1])) as Record<string, unknown>;
};

const getCustomSetup = (
  renderResult: string,
): Record<string, unknown> | null => {
  const result = renderResult.match(/customSetup="(.*?)"/s);

  if (!result) return null;

  return JSON.parse(decodeURIComponent(result[1])) as Record<string, unknown>;
};

describe("Sandpack", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(mdSandpack);

  it("Should resolve sandpack info", () => {
    const result = markdownIt.render(
      `
::: sandpack#vue Sandpack demo

@file App.vue
\`\`\`vue
<script setup>
import { ref } from 'vue'
const msg = ref('Hello World!')
</script>
<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
\`\`\`

@file Comp.vue

\`\`\`vue
<template>
  <div>Comp</div>
</template>
\`\`\`

:::
`,
      {},
    );

    expect(result).toMatchSnapshot();

    const template = getTemplate(result);
    const files = getFiles(result);
    const options = getOptions(result);
    const customSetup = getCustomSetup(result);

    expect(template).toEqual("vue");

    expect(files).toEqual({
      "App.vue": `\
<script setup>
import { ref } from 'vue'
const msg = ref('Hello World!')
</script>
<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
`,
      "Comp.vue": `\
<template>
  <div>Comp</div>
</template>
`,
    });

    expect(options).toEqual({});
    expect(customSetup).toEqual({});
  });

  it("Should resolve sandpack info with options", () => {
    const result = markdownIt.render(
      `
::: sandpack Sandpack demo with options

@file App.vue

\`\`\`vue
<script setup>
import { ref } from 'vue'
const msg = ref('Hello World!')
</script>
<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
\`\`\`

@file Comp.vue

\`\`\`vue
<template>
  <div>Comp</div>
</template>
\`\`\`

@options

\`\`\`js
{
  readOnly: true,
  showReadOnly: false
}
\`\`\`

:::
`,
      {},
    );

    expect(result).toMatchSnapshot();

    const template = getTemplate(result);
    const file = getFiles(result);
    const options = getOptions(result);
    const customSetup = getCustomSetup(result);

    expect(template).toEqual("");

    expect(file).toEqual({
      "App.vue": `\
<script setup>
import { ref } from 'vue'
const msg = ref('Hello World!')
</script>
<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
`,
      "Comp.vue": `\
<template>
  <div>Comp</div>
</template>
`,
    });
    expect(options).toEqual({
      readOnly: true,
      showReadOnly: false,
    });

    expect(customSetup).toEqual({});
  });

  it("Should resolve sandpack info with customSetup", () => {
    const result = markdownIt.render(
      `
::: sandpack#vue Sandpack demo with customSetup

@file App.vue

\`\`\`vue
<script setup>
import { ref } from 'vue'
const msg = ref('Hello World!')
</script>
<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
\`\`\`

@options

\`\`\`js
{
  readOnly: true,
  showReadOnly: false
}
\`\`\`

@setup

\`\`\`js
{
  entry: "/index.js",
}
\`\`\`

:::
`,
      {},
    );

    expect(result).toMatchSnapshot();

    const template = getTemplate(result);
    const file = getFiles(result);
    const options = getOptions(result);
    const customSetup = getCustomSetup(result);

    expect(template).toEqual("vue");

    expect(file).toEqual({
      "App.vue": `\
<script setup>
import { ref } from 'vue'
const msg = ref('Hello World!')
</script>
<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
`,
    });

    expect(options).toEqual({
      readOnly: true,
      showReadOnly: false,
    });

    expect(customSetup).toEqual({
      entry: "/index.js",
    });
  });

  it("Should resolve sandpack info with file attrs", () => {
    const result = markdownIt.render(
      `
::: sandpack Sandpack demo with options

@file /src/App.vue {readOnly hidden}

\`\`\`vue
<script setup>
import { ref } from 'vue'
const msg = ref('Hello World!')
</script>
<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
\`\`\`

@file /src/Comp.vue {active}

\`\`\`vue
<template>
  <div>Comp</div>
</template>
\`\`\`

@file Comp2.vue \\{hidden}

\`\`\`vue
<template>
  <div>Comp2</div>
</template>
\`\`\`

:::
`,
      {},
    );

    expect(result).toMatchSnapshot();

    const template = getTemplate(result);
    const file = getFiles(result);
    const options = getOptions(result);
    const customSetup = getCustomSetup(result);

    expect(template).toEqual("");

    expect(file).toEqual({
      "/src/App.vue": {
        code: `\
<script setup>
import { ref } from 'vue'
const msg = ref('Hello World!')
</script>
<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
`,
        active: false,
        hidden: true,
        readOnly: true,
      },
      "/src/Comp.vue": {
        code: `\
<template>
  <div>Comp</div>
</template>
`,
        active: true,
        hidden: false,
        readOnly: false,
      },
      "Comp2.vue": `\
<template>
  <div>Comp2</div>
</template>
`,
    });
    expect(options).toEqual({});

    expect(customSetup).toEqual({});
  });
});

import { decodeData } from "@vuepress/helper";
import MarkdownIt from "markdown-it";
import { describe, expect, it } from "vitest";

import { sandpack } from "../../src/node/markdown-it/sandpack/index.js";

const decodeFiles = (content: string): Record<string, string> =>
  JSON.parse(decodeData(content)) as Record<string, string>;

const getTemplate = (renderResult: string): string | null => {
  const result = /template="(?<template>.*?)"/su.exec(renderResult);

  if (!result) return null;

  return result[1];
};

const getFiles = (renderResult: string): Record<string, string> | null => {
  const result = /files="(?<encoded>.*?)"/su.exec(renderResult);

  if (!result) return null;

  return decodeFiles(result[1]);
};

const getOptions = (renderResult: string): Record<string, unknown> | null => {
  const result = /options="(?<options>.*?)"/su.exec(renderResult);

  if (!result) return null;

  return JSON.parse(decodeData(result[1])) as Record<string, unknown>;
};

const getCustomSetup = (renderResult: string): Record<string, unknown> | null => {
  const result = /customSetup="(?<customSetup>.*?)"/su.exec(renderResult);

  if (!result) return null;

  return JSON.parse(decodeData(result[1])) as Record<string, unknown>;
};

describe(sandpack, () => {
  const markdownIt = new MarkdownIt({ linkify: true }).use(sandpack);

  it("should resolve sandpack info", () => {
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

    expect(template).toBe("vue");

    expect(files).toStrictEqual({
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

    expect(options).toStrictEqual({});
    expect(customSetup).toStrictEqual({});
  });

  it("should resolve sandpack info with options", () => {
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

    expect(template).toBeNull();

    expect(file).toStrictEqual({
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
    expect(options).toStrictEqual({
      readOnly: true,
      showReadOnly: false,
    });

    expect(customSetup).toStrictEqual({});
  });

  it("should resolve sandpack info with customSetup", () => {
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

    expect(template).toBe("vue");

    expect(file).toStrictEqual({
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

    expect(options).toStrictEqual({
      readOnly: true,
      showReadOnly: false,
    });

    expect(customSetup).toStrictEqual({
      entry: "/index.js",
    });
  });

  it("should resolve sandpack info with file attrs", () => {
    const result = markdownIt.render(
      `
::: sandpack Sandpack demo with options

@file /src/App.vue [readOnly hidden]

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

@file /src/Comp.vue [active]

\`\`\`vue
<template>
  <div>Comp</div>
</template>
\`\`\`

@file Comp2.vue \\[hidden]

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

    expect(template).toBeNull();

    expect(file).toStrictEqual({
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
    expect(options).toStrictEqual({});

    expect(customSetup).toStrictEqual({});
  });

  it("should resolve sandpack info with file attrs and customSetup", () => {
    const result = markdownIt.render(
      `
::: sandpack Sandpack demo with file attrs and customSetup [rtl theme=dark]

@file /src/App.vue [readOnly]

\`\`\`vue
<script setup>
import { ref } from "vue";
import Comp from "./Comp.vue";

const msg = ref("Hello Playground!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
  <Comp />
</template>
\`\`\`

@file /src/Comp.vue [active]

\`\`\`vue
<script setup>
import { useBattery } from "@vueuse/core";
import { ref } from "vue";

const { charging, level } = useBattery();
</script>

<template>
  <h1>Battery status</h1>
  <p>Charging: {{ charging }}</p>
  <p>Level: {{ level * 100 }}%</p>
</template>
\`\`\`

@setup

\`\`\`js
{
  dependencies: {
    "@vueuse/core": "latest",
    "@vueuse/shared": "latest",
    "vue-demi": "latest",
  }
}
\`\`\`

:::
`,
      {},
    );

    expect(result).toMatchSnapshot();
    expect(result).includes("rtl");
    expect(result).includes('theme="dark"');

    const template = getTemplate(result);
    const file = getFiles(result);
    const options = getOptions(result);
    const customSetup = getCustomSetup(result);

    expect(template).toBeNull();

    expect(file).toStrictEqual({
      "/src/App.vue": {
        code: `\
<script setup>
import { ref } from "vue";
import Comp from "./Comp.vue";

const msg = ref("Hello Playground!");
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
  <Comp />
</template>
`,
        active: false,
        hidden: false,
        readOnly: true,
      },
      "/src/Comp.vue": {
        code: `\
<script setup>
import { useBattery } from "@vueuse/core";
import { ref } from "vue";

const { charging, level } = useBattery();
</script>

<template>
  <h1>Battery status</h1>
  <p>Charging: {{ charging }}</p>
  <p>Level: {{ level * 100 }}%</p>
</template>
`,
        active: true,
        hidden: false,
        readOnly: false,
      },
    });
    expect(options).toStrictEqual({});

    expect(customSetup).toStrictEqual({
      dependencies: {
        "@vueuse/core": "latest",
        "@vueuse/shared": "latest",
        "vue-demi": "latest",
      },
    });
  });
});

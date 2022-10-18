import type { Ref } from 'vue'
import type { App, Page } from '@vuepress/core'

type PageIndex = {
  title: Page['title']
  path: Page['path']
  pathLocale: Page['pathLocale']
  frontmatter: Frontmatter
  contents: PageContent[]
}
type PageContent = {
  header: string
  slug: string
  content: string
}
type Frontmatter = {
  category: string[] | null
  tag: string[] | null
} | null

type Word = {
  type: string
  str: string
}
type Suggestion = {
  path: string
  parentPageTitle: string
  title: string
  display: Word[]
  page: PageIndex
  frontmatter: Frontmatter
  content: PageContent | null
  point: number
}
type SearchIndex = PageIndex[]
type SearchIndexRef = Ref<SearchIndex>

type Options = {
  fullText?: boolean
  placeholder?: string
  frontmatter?: {
    tag?: string
    category?: string
  }
}

interface LocaleOptions extends Options {
  locales?: LocalesOptions
}

type VuepressApp = Pick<App, 'env' | 'writeTemp'> & {
  pages: VuepressPage[]
}
type VuepressPage = Pick<Page, 'pathLocale' | 'title' | 'path' | 'headers' | 'contentRendered' | 'frontmatter'>

type LocalesOptions = LocaleConfig<Options>

type LocaleData = Record<string, any>
declare type LocaleConfig<T extends LocaleData = LocaleData> = Record<string, Partial<T>>

declare const __NEXT_SEARCH_OPTIONS__: Options

export {
  PageIndex,
  PageContent,
  Word,
  Suggestion,
  SearchIndex,
  SearchIndexRef,
  Options,
  LocaleOptions,
  Frontmatter,
  VuepressApp,
  VuepressPage,
}

import type { ThemeLocaleData } from "../../shared/index.js";

export const ptLocale: ThemeLocaleData = {
  lang: "pt-PT",

  navbarLocales: {
    langName: "Português",
    selectLangAriaLabel: "Selecionar idioma",
  },

  metaLocales: {
    author: "Autor",
    date: "Data de escrita",
    origin: "Original",
    views: "Visualizações",
    category: "Categoria",
    tag: "Etiqueta",
    readingTime: "Tempo de leitura",
    words: "Palavras",
    toc: "Nesta página",
    prev: "Anterior",
    next: "Seguinte",
    contributors: "Contribuidores",
    editLink: "Editar esta página",
    print: "Imprimir",
  },

  blogLocales: {
    article: "Artigos",
    articleList: "Lista de artigos",
    category: "Categoria",
    tag: "Etiqueta",
    timeline: "Cronologia",
    timelineTitle: "Ontem, de novo!",
    all: "Todos",
    intro: "Introdução pessoal",
    star: "Estrela",
    empty: "Nenhum $text",
  },

  paginationLocales: {
    prev: "Anterior",
    next: "Seguinte",
    navigate: "Ir para",
    action: "Ir",
    errorText: "Por favor, introduz um número entre 1 e $page!",
  },

  outlookLocales: {
    themeColor: "Cor do tema",
    darkmode: "Modo do tema",
    fullscreen: "Ecrã inteiro",
  },

  encryptLocales: {
    iconLabel: "Página encriptada",
    placeholder: "Introduz a palavra-passe",
    remember: "Lembrar a palavra-passe",
    errorHint: "Por favor, introduz a palavra-passe correta!",
  },

  routerLocales: {
    skipToContent: "Saltar para o conteúdo principal",
    notFoundTitle: "Página não encontrada",
    notFoundMsg: [
      "Não há nada aqui.",
      "Como é que chegámos aqui?",
      "Isto é um Quatro-Zero-Quatro.",
      "Parece que temos algumas ligações quebradas.",
    ],
    back: "Voltar",
    home: "Ir para a página inicial",
  },
};

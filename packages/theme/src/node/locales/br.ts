import type { ThemeLocaleData } from "../../shared/index.js";

export const brLocale: ThemeLocaleData = {
  lang: "pt-BR",

  navbarLocales: {
    langName: "Português",
    selectLangAriaLabel: "Selecione a língua",
  },

  metaLocales: {
    author: "Autor",
    date: "Escrito em",
    origin: "Original",
    views: "Visualizações",
    category: "Categoria",
    tag: "Tag",
    readingTime: "Tempo de Leitura",
    words: "Palavras",
    toc: "On This Page",
    prev: "Prev",
    next: "Next",
    editLink: "Editar esta página",
    contributors: "Contribuidores",
    print: "Imprimir",
  },

  blogLocales: {
    article: "Artigos",
    articleList: "Lista de Artigos",
    category: "Categorias",
    tag: "Tag",
    timeline: "Linha do Tempo",
    timelineTitle: "Ontem, de novo!",
    all: "Todos",
    intro: "Intro Pessoal",
    star: "Estrela",
    empty: "Nenhum $text",
  },

  paginationLocales: {
    prev: "Anterior",
    next: "Próximo",
    navigate: "Pular para",
    action: "Ir",
    errorText: "Por favor, digite um número entre 1 e $page !",
  },

  outlookLocales: {
    themeColor: "Cor do Tema",
    darkmode: "Modo do Tema",
    fullscreen: "Full Screen",
  },

  encryptLocales: {
    iconLabel: "Page Encrypted",
    placeholder: "Entre a senha",
    remember: "Remember password",
    errorHint: "Por favor, entre a senha correta!",
  },

  routeLocales: {
    notFoundTitle: "Não Encontrado",
    skipToContent: "Pular para o conteúdo",
    notFoundMsg: [
      "Não há nada aqui.",
      "Como chegou até aqui?",
      "Isto é um Quatro-Zero-Quatro.",
      "Parece que temos alguns links quebrados.",
    ],
    back: "Voltar",
    home: "Leve-me para casa",
  },
};

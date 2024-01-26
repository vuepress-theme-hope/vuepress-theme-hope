<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:html="http://www.w3.org/TR/REC-html40">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>RSS Feed</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style>
          :root {
            --bg-color-back: #f8f8f8;
            --bg-color-float: #fff;
            --text-color: #2c3e50;
            --border-color: #eaecef;
            --border-color-dark: #cfd4db;
            --code-bg-color: #ecf4fa;
            --code-color: #383a42;
            --brand-color: #3eaf7c;
            --font-family-mono: consolas, monaco, "Andale Mono", "Ubuntu Mono", monospace;

            color-scheme: light dark;
          }

          @media (prefers-color-scheme: dark) {
            :root {
              --bg-color-back: #0d1117;
              --bg-color-float: #161b22;
              --text-color: #ccc;
              --border-color: #30363d;
              --border-color-dark: #394048;
              --code-bg-color: #282c34;
              --code-color: #abb2bf;
            }
          }

          html,
          body {
            margin: 0;
            padding: 0;
            background: var(--bg-color-back);
          }

          html {
            font-size: 16px;
          }

          body {
            min-height: 100vh;
            color: var(--text-color);
          }

          a {
            color: var(--brand-color);
            font-weight: 500;
            text-decoration: none;
            overflow-wrap: break-word;
          }

          kbd {
            display: inline-block;

            min-width: 1em;
            margin-inline: 0.125rem;
            padding: 0.25em;
            border: 1px solid var(--border-color-dark);
            border-radius: 0.25em;

            background: var(--bg-color-back);
            box-shadow: 1px 1px 4px 0 rgb(0 0 0 / 15%);

            font-family: var(--font-family-mono);
            line-height: 1;
            letter-spacing: -0.1em;
            text-align: center;
          }

          pre {
            overflow: auto;

            padding: 1rem;
            border-radius: 6px;

            background: var(--code-bg-color);
            color: var(--code-color);

            direction: ltr;
          }

          code {
            margin: 0;
            padding: 0.2rem 0.4rem;
            border-radius: 5px;

            background: rgba(127 127 127 / 12%);

            font-size: 0.85em;
            font-family: var(--font-family-mono);
            overflow-wrap: break-word;
          }

          @media (prefers-color-scheme: dark) {
            code {
              background: #333;
            }
          }

          pre code {
            background: transparent;
          }

          table code {
            padding: 0.1rem 0.4rem;
          }

          p a code {
            color: var(--brand-color);
            font-weight: 400;
          }

          strong {
            font-weight: 600;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-weight: 500;
            line-height: 1.25;
            overflow-wrap: break-word;
          }

          h1 {
            font-size: 2rem;

            @media (max-width: 419px) {
              font-size: 1.9rem;
            }
          }

          h2 {
            padding-bottom: 0.3rem;
            border-bottom: 1px solid var(--border-color);
            font-size: 1.65rem;
          }

          h3 {
            font-size: 1.35rem;
          }

          h4 {
            font-size: 1.15rem;
          }

          h5 {
            font-size: 1.05rem;
          }

          h6 {
            font-size: 1rem;
          }

          p,
          ul,
          ol {
            line-height: 1.5;
            overflow-wrap: break-word;
          }

          ul,
          ol {
            padding-inline-start: 1.2em;
          }

          img {
            max-width: 100%;
          }

          blockquote {
            margin: 1rem 0;
            padding: 0.25rem 0 0.25rem 1rem;
            border-inline-start: 0.2rem solid #ddd;

            color: #666;

            font-size: 1rem;
            overflow-wrap: break-word;
          }

          blockquote p {
            margin: 0;
          }

          hr {
            border: 0;
            border-top: 1px solid var(--border-color);
          }

          table {
            display: block;
            overflow-x: auto;
            margin: 1rem 0;
            border-collapse: collapse;
          }

          tr:nth-child(2n) {
            background: #f6f8fa;
          }

          th,
          td {
            padding: 0.6em 1em;
            border: 1px solid var(--border-color-dark);
            border: 1px solid var(--border-color-dark);
          } div[class*="language-"] {
            position: relative;
            border-radius: 6px;
          } div[class*='language-'']::before {
            content: attr(data-title);

            position: absolute;
            top: 0.8em;
            right: 1em;
            z-index: 3;

            font-size: 0.75rem;
          }
        </style>
        <style type="text/css">
          .feed-info {
            margin-top: 1rem;
            padding: 0 2rem;
            text-align: center;
          }

          .feed-title {
            font-weight: bold;
          }

          .feed-subtitle {
            border: none;
            font-size: 1.5rem;
          }

          .feed-detail {
            display: inline-block;

            max-width: 960px;
            margin: 0.5rem auto;
            border: 1px solid #fff;
            border-collapse: collapse;
            border-radius: 8px;

            text-align: start;
          }

          .feed-detail tr {
            border: none;
            background: transparent;
          }

          .feed-detail th,
          .feed-detail td {
            padding: 0.25rem 0.5rem;
            border: none;
          }

          .feed-detail td:first-child {
            font-weight: bold;
            text-align: right;
          }

          .rss-logo {
            height: 8rem;
          }

          .visit-button {
            display: inline-block;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;

            background: var(--brand-color);
            color: var(--bg-color-float);
            font-weight: bold;
          }

          .rss-item-wrapper {
            margin: 0 1rem;
            text-align: center;
          }

          @media (max-width: 419px) {
            .rss-item-wrapper {
              margin: 0;
            }
          }

          .rss-item {
            overflow: hidden;

            max-width: 960px;
            margin: 16px auto;
            border-radius: 8px;

            background: var(--bg-color-float);
            box-shadow: 2px 4px 8px rgba(0 0 0 / 15%);

            text-align: start;
          }

          @media (max-width: 419px) {
            .rss-item {
              border-radius: 0;
            }
          }

          @media (prefers-color-scheme: dark) {
            .rss-item {
              box-shadow: 2px 4px 8px rgba(0 0 0 / 30%);
            }
          }

          .rss-header {
            padding: 8px 16px;
            background-color: var(--brand-color);
            color: var(--bg-color-float);
          }

          .rss-title {
            border-bottom: 1px solid var(--bg-color-float);
            font-weight: 600;
            font-size: 1.5rem;
            line-height: 1.75;
          }

          .rss-info {
            margin-top: 4px;
            font-size: 14px;
          }

          .rss-info > span {
            display: inline-block;
            margin: 4px 8px 4px 0;
          }

          .rss-info > span:last-child {
            margin-inline-end: 0;
          }

          .rss-info label {
            display: inline-block;
            margin-inline-end: 0.5em;
          }

          .rss-body {
            padding: 4px 16px;
          }

          .rss-footer {
            padding: 8px 16px;
            font-size: 14px;
          }

          .rss-link {
            display: inline-block;

            padding: 6px 12px;
            border-radius: 8px;

            background: var(--brand-color);
            color: var(--bg-color-float);
          }

          footer {
            margin-top: 10px;
            padding: 4px;

            color: #888;

            font-size: 12px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="feed-info">
          <xsl:if test="/rss/channel/image/url">
            <img class="feed-logo" src="{/rss/channel/image/url}" alt="rss logo" />
          </xsl:if>
          <h1 class="feed-title">
            <xsl:value-of select="/rss/channel/title"></xsl:value-of>
          </h1>
          <h2 class="feed-subtitle">
            <xsl:value-of select="/rss/channel/description" />
          </h2>
          <div>
            <a class="visit-button" href="{rss/channel/link}" target="_blank">
              Visit Website
            </a>
          </div>
          <table class="feed-detail">
            <tbody>
              <tr>
                <td>Language:</td>
                <td>
                  <xsl:value-of select="/rss/channel/language" />
                </td>
              </tr>
              <xsl:if test="/rss/channel/pubDate and /rss/channel/pubDate != /rss/channel/lastBuildDate">
                <tr>
                  <td>Published Date:</td>
                  <td>
                    <xsl:value-of select="substring-before(/rss/channel/pubDate,' GMT')" />
                  </td>
                </tr>
              </xsl:if>
              <tr>
                <td>Last Build Date:</td>
                <td>
                  <xsl:value-of select="substring-before(/rss/channel/lastBuildDate,' GMT')" />
                </td>
              </tr>
              <xsl:if test="/rss/channel/copyright">
                <tr>
                  <td>Copyright:</td>
                  <td>
                    <xsl:value-of select="/rss/channel/copyright" />
                  </td>
                </tr>
              </xsl:if>
              <xsl:if test="/rss/channel/category">
                <tr>
                  <td>
                    Catetory:
                  </td>
                  <td>
                    <xsl:for-each select="/rss/channel/category">
                      <xsl:if test="position() != 1">, </xsl:if>
                      <xsl:value-of select="current()" />
                    </xsl:for-each>
                  </td>
                </tr>
              </xsl:if>
            </tbody>
          </table>
        </div>

        <div class="rss-item-wrapper">
          <xsl:for-each select="/rss/channel/item">
            <xsl:variable name="feed-index" select="position()" />
            <div class="rss-item">
              <div class="rss-header">
                <div class="rss-title">
                  <xsl:value-of select="title" />
                </div>
                <div class="rss-info">
                  <xsl:if test="author">
                    <span>
                      <label for="author-{$feed-index}">Author:</label>
                      <span id="author-{$feed-index}">
                        <xsl:value-of select="author" />
                      </span>
                    </span>
                  </xsl:if>
                  <xsl:if test="category">
                    <span>
                      <label for="category-{$feed-index}">Catetory:</label>
                      <span id="category-{$feed-index}">
                        <xsl:for-each select="category">
                          <xsl:if test="position() != 1">, </xsl:if>
                          <xsl:value-of select="current()" />
                        </xsl:for-each>
                      </span>
                    </span>
                  </xsl:if>
                  <span>
                    <label for="date-{$feed-index}">Date:</label>
                    <span id="date-{$feed-index}">
                      <xsl:value-of select="substring-before(pubDate,' GMT')" />
                    </span>
                  </span>
                </div>
              </div>
              <div class="rss-body">
                <xsl:value-of select="*[name()='content:encoded']" disable-output-escaping="yes" />
              </div>
              <div class="rss-footer">
                <a class="rss-link" href="{link}" target="_blank">
                  Visit
                </a>
              </div>
            </div>
          </xsl:for-each>
        </div>
        <footer>
          Generatd by <a href="https://plugin-feed2.vuejs.press">vuepress-plugin-feed2</a>
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

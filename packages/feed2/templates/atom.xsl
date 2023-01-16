<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:html="http://www.w3.org/TR/REC-html40">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="atom:feed">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>Atom Feed</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          html,
          body {
            margin: 0;
            padding: 0;
            background: #f8f8f8;
            font-size: 14px;
          }

          body {
            min-height: 100vh;

            color: #2c3e50;

            font-size: 16px;

            font-display: optional;

            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            -webkit-tap-highlight-color: transparent;
          }

          a {
            color: #339af0;
            font-weight: 500;
            text-decoration: none;
            overflow-wrap: break-word;
          }

          kbd {
            padding: 0 0.15em;
            border: solid 0.15rem #ddd;
            border-bottom: solid 0.25rem #ddd;
            border-radius: 0.15rem;

            background: #eee;
          }

          pre {
            overflow: auto;
            padding: 1rem;
            border-radius: 6px;
            background: #ecf4fa;
          }

          code {
            margin: 0;
            padding: 0.25rem 0.5rem;
            border-radius: 3px;

            background: rgba(127 127 127 / 12%);

            font-size: 0.85em;
            overflow-wrap: break-word;
          }

          pre code {
            background: transparent !important;
          }

          table code {
            padding: 0.1rem 0.4rem;
          }

          p a code {
            color: #3eaf7c;
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
          }

          h2 {
            padding-bottom: 0.3rem;
            border-bottom: 1px solid #eaecef;
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
            line-height: 1.7;
            overflow-wrap: break-word;
          }

          @media print {
            p,
            ul,
            ol {
              line-height: 1.5;
            }
          }

          ul,
          ol {
            padding-inline-start: 1.2em;
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
            border-top: 1px solid #eaecef;
          }

          table {
            display: block;
            overflow-x: auto;
            margin: 1rem 0;
            border-collapse: collapse;
          }

          tr {
            border-top: 1px solid #dfe2e5;
          }

          tr:nth-child(2n) {
            background: #f6f8fa;
          }

          th,
          td {
            padding: 0.6em 1em;
            border: 1px solid #dfe2e5; } div[class*="language-"] {
            position: relative;
            border-radius: 6px;
            background: #ecf4fa; } div[class*="language-"]::before {
            content: attr(data-ext);

            position: absolute;
            top: 0.8em;
            right: 1em;
            z-index: 3;

            color: rgba(56 58 66 / 67%);

            font-size: 0.75rem;
          }

          .atom-info {
            margin-top: 1rem;
            padding: 0 2rem;
            text-align: center;
          }

          .atom-info > h1 {
            font-weight: bold;
          }

          .atom-info > h2 {
            border: none;
            font-size: 1.5rem;
          }

          .atom-info table {
            display: inline-block;

            max-width: 960px;
            margin: 0.5rem auto;
            border-collapse: collapse;

            text-align: start;
          }

          .atom-info tr {
            background: transparent;
            border: none;
          }

          .atom-info th,
          .atom-info td {
            padding: 0.5rem 0.25rem;
            border: none;
          }

          .atom-info td:first-child {
            font-weight: bold;
          }

          .atom-logo {
            height: 8rem;
          }

          .atom-icon {
            height: 1em;
            margin-inline-end: 1rem;
          }

          .atom-item-wrapper {
            padding: 16px;
            text-align: center;
          }

          .atom-item {
            overflow: hidden;

            max-width: 960px;
            margin: 16px auto;
            border-radius: 0.5rem;

            background: #fff;
            box-shadow: 2px 4px 8px rgba(0 0 0 / 15%);

            text-align: start;
          }

          .atom-header {
            padding: 8px 12px;
            background-color: #339af0;
            color: #fff;
          }

          .atom-item-title {
            border-bottom: 1px solid #fff;
            font-weight: bold;
            font-size: 1.5rem;
            line-height: 1.75;
          }

          .atom-item-info > span {
            display: inline-block;
            margin: 4px 0;
          }

          .atom-item-info > span + span {
            margin-inline-start: 8px;
          }
          
          .atom-body {
            padding: 4px 16px;
          }

          .atom-footer {
            display: flex;
            justify-content: space-between;
            padding: 12px 16px;
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
        <div class="atom-info">
          <xsl:if test="atom:logo">
            <img class="atom-logo" src="{atom:logo}" alt="atom logo" />
          </xsl:if>
          <h1>
            <xsl:if test="atom:icon and not(atom:logo)">
              <img class="atom-icon" src="{atom:icon}" alt="atom logo" />
            </xsl:if>
            <xsl:value-of select="atom:title"></xsl:value-of>
          </h1>
          <h2>
            <xsl:value-of select="atom:subtitle" />
          </h2>

          <table>
            <tbody>
              <tr>
                <td>Last update time:</td>
                <td>
                  <xsl:value-of select="concat(substring(atom:updated,0,11),concat(' ', substring(atom:updated,12,5)))" />
                </td>
              </tr>
              <xsl:if test="atom:author/atom:name">
                <tr>
                  <td>Author:</td>
                  <td>
                    <xsl:for-each select="atom:author/atom:name">
                      <xsl:if test="position() != 1">, </xsl:if>
                      <xsl:value-of select="current()" />
                    </xsl:for-each>
                  </td>
                </tr>
              </xsl:if>
              <xsl:if test="atom:contributor/atom:name">
                <tr>
                  <td>Contributor:</td>
                  <td>
                    <xsl:for-each select="atom:contributor/atom:name">
                      <xsl:if test="position() != 1">, </xsl:if>
                      <xsl:value-of select="current()" />
                    </xsl:for-each>

                  </td>
                </tr>
              </xsl:if>
              <xsl:if test="atom:category">
                <tr>
                  <td>Categories:</td>
                  <td>
                    <xsl:for-each select="atom:category">
                      <xsl:if test="position() != 1">, </xsl:if>
                      <xsl:value-of select="current()/@term" />
                    </xsl:for-each>
                  </td>
                </tr>
              </xsl:if>
              <xsl:if test="atom:rights">
                <tr>
                  <td>Copyright:</td>
                  <td>
                    <xsl:value-of select="atom:rights" />
                  </td>
                </tr>
              </xsl:if>
            </tbody>
          </table>
        </div>

        <div class="atom-item-wrapper">
          <xsl:for-each select="atom:entry">
            <div class="atom-item">
              <div class="atom-header">
                <div class="atom-item-title">
                  <xsl:value-of select="atom:title" />
                </div>
                <div class="atom-item-info">
                  <xsl:if test="atom:author">
                    <span>
                      <b>Author: </b>
                      <xsl:for-each select="atom:author">
                        <xsl:if test="position() != 1">, </xsl:if>
                        <xsl:value-of select="current()/atom:name" />
                      </xsl:for-each>
                    </span>
                  </xsl:if>
                  <xsl:if test="atom:contributor">
                    <span>
                      <b>Contributor: </b>
                      <xsl:for-each select="atom:contributor">
                        <xsl:if test="position() != 1">, </xsl:if>
                        <xsl:value-of select="current()/atom:name" />
                      </xsl:for-each>
                    </span>
                  </xsl:if>
                  <xsl:if test="atom:published">
                    <span>
                      <b>Date: </b>
                      <xsl:value-of select="concat(substring(atom:updated,0,11),concat(' ', substring(atom:updated,12,5)))" />
                    </span>
                  </xsl:if>
                  <xsl:if test="atom:updated">
                    <span>
                      <b>Updated time: </b>
                      <xsl:value-of select="concat(substring(atom:updated,0,11),concat(' ', substring(atom:updated,12,5)))" />
                    </span>
                  </xsl:if>
                </div>
              </div>
              <div class="atom-body">
                <xsl:value-of select="atom:summary" disable-output-escaping="yes" />
              </div>
              <div class="atom-footer">
                <a href="{atom:link/@href}" target="_blank">
                  See Details
                </a>
                <span>
                  <xsl:if test="atom:rights">
                    <b>Copyright: </b>
                    <xsl:value-of select="atom:rights" />
                  </xsl:if>
                </span>
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

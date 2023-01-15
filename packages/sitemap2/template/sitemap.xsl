<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-size: 14px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th {
            min-width: 56px;
            padding: 8px;
            border: 1px solid #ddd;

            background-color: #41b883;
            color: #fff;

            font-weight: bold;
            font-size: 14px;
            text-align: left;
          }

          td {
            padding: 4px;
            border: 1px solid black;
            font-size: 12px;
          }

          tr:nth-child(even) {
            background-color: #f2f2f2;
          }

          tr:hover {
            background-color: #e8e8e8;
          }

          a {
            color: inherit;
          }

          footer {
            margin-top: 10px;
            padding: 4px;

            color: grey;

            font-size: 12px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h1>Sitemap</h1>
        <div id="content">
          <table>
            <tr style="border-bottom: 1px black solid;">
              <th>URL</th>
              <th>Priority</th>
              <th>Change Frequency</th>
              <th>Last Updated Time</th>
            </tr>
            <xsl:variable name="lower" select="'abcdefghijklmnopqrstuvwxyz'" />
            <xsl:variable name="upper" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <xsl:if test="position() mod 2 != 0">
                  <xsl:attribute name="class">ood</xsl:attribute>
                </xsl:if>
                <xsl:if test="position() mod 2 != 1">
                  <xsl:attribute name="class">even</xsl:attribute>
                </xsl:if>
                <td>
                  <xsl:variable name="itemURL">
                    <xsl:value-of select="sitemap:loc" />
                  </xsl:variable>
                  <a href="{$itemURL}">
                    <xsl:value-of select="sitemap:loc" />
                  </a>
                </td>
                <td>
                  <xsl:choose>
                    <xsl:when test="sitemap:priority">
                      <xsl:value-of select="concat(sitemap:priority*100,'%a')" />
                    </xsl:when>
                    <xsl:otherwise>
                      <xsl:text>0.5</xsl:text>
                    </xsl:otherwise>
                  </xsl:choose>
                </td>
                <td>
                  <xsl:choose>
                    <xsl:when test="sitemap:changefreq">
                      <xsl:value-of select="concat(translate(substring(sitemap:changefreq, 1, 1),concat($lower, $upper),concat($upper, $lower)),substring(sitemap:changefreq, 2))" />
                    </xsl:when>
                    <xsl:otherwise>
                      <xsl:text>-</xsl:text>
                    </xsl:otherwise>
                  </xsl:choose>
                </td>
                <td>
                  <xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)))" />
                </td>
              </tr>
            </xsl:for-each>
          </table>
        </div>
        <footer>
          Generatd by <a href="https://plugin-sitemap2.vuejs.press">vuepress-plugin-sitemap2</a>
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

export const getRedirectHTML = (redirectUrl: string): string => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="noindex">
  <meta http-equiv="refresh" content="0; url=${redirectUrl}">
  <link rel="canonical" href="${redirectUrl}">
  <title>Redirecting...</title>
  <script>
    const anchor = window.location.hash.substr(1);
    location.href = \`${redirectUrl}\${anchor?\`#\${anchor}\`:""}\`;
  </script>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>`;

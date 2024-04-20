export const generateHtml = (title: string, postContent: string) =>
  `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>

<body>
    ${postContent}
</body>

</html>`;

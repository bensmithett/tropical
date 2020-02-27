export default function documentTemplate ({
  stylesHTML,
  bodyHTML,
  helmet,
  clientBundlePath
}) {
  return `<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
  <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    ${stylesHTML}
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    ${bodyHTML}
    <script src='${clientBundlePath}'></script>
  </body>
</html>
  `
}

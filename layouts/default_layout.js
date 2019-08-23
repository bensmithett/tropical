export default function defaultLayout ({
  stylesHTML,
  bodyHTML,
  helmet,
  clientBundlePath
}) {
  return `<!doctype html>
<html lang="en">
  <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    ${stylesHTML}
  </head>
  <body>
    ${bodyHTML}
    <script src='${clientBundlePath}'></script>
  </body>
</html>
`
}

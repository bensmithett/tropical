export default function defaultLayout ({stylesHTML, bodyHTML, helmet}) {
  return `<!doctype html>
<html lang="en">
  <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${stylesHTML}
  </head>
  <body>
    ${bodyHTML}
    <script src='/client.bundle.js'></script>
  </body>
</html>
`
}

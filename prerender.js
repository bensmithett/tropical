const fse = require('fs-extra')
const path = require('path')

const transformedTemplate = fse.readFileSync(
  path.resolve(__dirname, 'dist/static/index.html'),
  'utf-8'
)
const { Renderer } = require('./dist/server/entry-server.js')

const renderer = new Renderer(transformedTemplate)

Object.entries(renderer.pages).forEach(([pathname, page]) => {
  const { body } = renderer.render(pathname)
  const filePath = `dist/static${page.filePath}.html`
  fse.outputFileSync(path.resolve(__dirname, filePath), body)
  console.log('🖨   Prerendered', filePath)
})
Object.entries(renderer.feeds).forEach(([pathname, feed]) => {
  const body = feed(renderer.pages)
  const filePath = `dist/static${pathname}`
  fse.outputFileSync(path.resolve(__dirname, filePath), body)
  console.log('🖨   Prerendered', filePath)
})
console.log('🦖  Your static site is ready to deploy from dist/static')

const pkg = require('./package.json')
if (pkg.tropical.siteHost === 'https://www.example.org') {
  console.log(`⚠️   Configure tropical.siteHost in package.json, otherwise links in your JSON Feed won't work!`)
}

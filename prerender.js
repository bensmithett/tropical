import fse from 'fs-extra'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { createServer as createViteServer } from 'vite'

const dir = dirname(fileURLToPath(import.meta.url))

const transformedTemplate = fse.readFileSync(
  resolve(dir, 'dist/static/index.html'),
  'utf-8'
)

async function prerender () {
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }
  })

  try {
    const { Renderer } = await vite.ssrLoadModule('/src/entry-server.jsx')
    const renderer = new Renderer(transformedTemplate)

    Object.entries(renderer.pages).forEach(([pathname, page]) => {
      const { body } = renderer.render(pathname)
      const filePath = `dist/static${page.filePath}.html`
      fse.outputFileSync(resolve(dir, filePath), body)
      console.log('🖨   Prerendered', filePath)
    })
    Object.entries(renderer.feeds).forEach(([pathname, feed]) => {
      const body = feed(renderer.pages)
      const filePath = `dist/static${pathname}`
      fse.outputFileSync(resolve(dir, filePath), body)
      console.log('🖨   Prerendered', filePath)
    })
    console.log('🦖  Your static site is ready to deploy from dist/static')

    const pkg = JSON.parse(await fse.readFile('./package.json'))
    if (pkg.tropical.siteHost === 'https://www.example.org') {
      console.log(`⚠️   Configure tropical.siteHost in package.json, otherwise links in your JSON Feed won't work!`)
    }
  } catch (e) {
    vite.ssrFixStacktrace(e)
    console.error(e)
  }

  await vite.close()
}

prerender()

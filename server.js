import fse from 'fs-extra'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const dir = dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const app = express()
  const vite = await createViteServer({
    appType: 'custom',
    server: { middlewareMode: true }
  })
  app.use(vite.middlewares)

  app.use('*', async (req, res) => {
    const { pathname } = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`)

    try {
      const template = fse.readFileSync(resolve(dir, 'index.html'), 'utf-8')
      const transformedTemplate = await vite.transformIndexHtml(pathname, template)
      const { Renderer } = await vite.ssrLoadModule('/src/entry-server.jsx')
      const renderer = new Renderer(transformedTemplate)
      const { status, type, body } = renderer.render(pathname)
      res.status(status).set({ 'Content-Type': type }).end(body)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  app.listen(3000)

  console.log('🏝   Your Tropical site is now being served at: http://localhost:3000')
}

createServer()

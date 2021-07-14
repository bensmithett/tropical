const fs = require('fs')
const path = require('path')
const express = require('express')
const { createServer: createViteServer } = require('vite')

async function createServer() {
  const app = express()
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }
  })
  app.use(vite.middlewares)

  app.use('*', async (req, res) => {
    const { pathname } = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`)

    try {
      const template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
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

  app.listen(5000)

  console.log('🏝   Your Tropical site is now being served at: http://localhost:5000')
}

createServer()

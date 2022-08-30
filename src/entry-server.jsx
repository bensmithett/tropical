import ReactDOMServer from 'react-dom/server'
import { createRenderer as createFelaRenderer } from 'fela'
import { RendererProvider } from 'react-fela'
import { renderToMarkup } from 'fela-dom'
import { MDXProvider } from '@mdx-js/react'
import { HeadProvider, Link } from 'react-head'
import { DefaultLayout } from './layouts/DefaultLayout'
import { CodeBlock } from './components/tropical/CodeBlock'
import cssReset from './cssReset'

export class Renderer {
  pages = null
  feeds = null
  transformedTemplate = null

  constructor(transformedTemplate) {
    this.pages = gatherPages()
    this.feeds = gatherFeeds()
    this.transformedTemplate = transformedTemplate
  }

  render(pathname) {
    if (this.feeds[pathname]) {
      return this.renderFeed(pathname)
    } else {
      return this.renderPage(pathname)
    }
  }

  renderFeed(pathname) {
    return {
      status: 200,
      type: 'application/feed+json',
      body: this.feeds[pathname](this.pages)
    }
  }

  renderPage(pathname) {
    if (!pathname.endsWith('/')) pathname = `${pathname}/`

    const headTags = []
    const felaRenderer = createFelaRenderer()
    cssReset(felaRenderer)
    const {
      Component,
      meta = {},
      tableOfContents = []
    } = this.pages[pathname] || this.pages['/404/']
    const Layout = meta.Layout || DefaultLayout

    const html = ReactDOMServer.renderToString(
      <HeadProvider headTags={headTags}>
        <RendererProvider renderer={felaRenderer}>
          <MDXProvider
            components={{
              pre: ({ children }) => (
                <CodeBlock language={children.props.className?.replace(/language-/, '')}>
                  {children.props.children.trim()}
                </CodeBlock>
              )
            }}
          >
            {Object.entries(this.feeds).map(([pathname, { type }]) => (
              <Link rel='alternate' type={type} href={pathname} key={pathname} />
            ))}
            <Layout meta={meta} tableOfContents={tableOfContents} pages={this.pages}>
              <Component meta={meta} tableOfContents={tableOfContents} pages={this.pages} />
            </Layout>
          </MDXProvider>
        </RendererProvider>
      </HeadProvider>
    )

    return {
      status: this.pages[pathname] ? 200 : 404,
      type: 'text/html',
      body: this.transformedTemplate
        .replace('<!--react-head-outlet-->', ReactDOMServer.renderToStaticMarkup(headTags))
        .replace('<!--fela-outlet-->', renderToMarkup(felaRenderer))
        .replace('<!--body-outlet-->', html)
    }
  }
}

function gatherPages() {
  const modules = import.meta.globEager('./pages/**/*.{jsx,mdx}')

  return Object.entries(modules).reduce((pages, [modulePath, page]) => {
    const filePath = modulePath.replace(/^\.\/pages/, '').replace(/(\.jsx|\.mdx)$/, '')
    const urlPath = filePath.endsWith('/index') ? filePath.replace(/index$/, '') : `${filePath}/`
    pages[urlPath] = {
      Component: page.default,
      meta: page.meta,
      tableOfContents: page.tableOfContents,
      filePath,
      modulePath,
      urlPath
    }
    return pages
  }, {})
}

function gatherFeeds() {
  const modules = import.meta.globEager('./feeds/**/*.jsx')
  return Object.entries(modules).reduce((feeds, [modulePath, feed]) => {
    const urlPath = modulePath.replace(/^\.\/feeds/, '').replace(/\.jsx$/, '.json')
    feeds[urlPath] = feed.default
    return feeds
  }, {})
}

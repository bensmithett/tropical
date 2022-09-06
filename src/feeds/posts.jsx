import ReactDOMServer from 'react-dom/server'
import dayjs from 'dayjs'
import { RendererProvider } from 'react-fela'
import { createRenderer as createFelaRenderer } from 'fela'
import { pagesWithTag } from '../utils'
import pkg from '../../package.json'

const FEED_TITLE = 'Another Tropical site'
const SITE_HOST = pkg.tropical.siteHost

export default function renderFeed (pages) {

  const posts = pagesWithTag(pages, 'post')

  return JSON.stringify({
    version: 'https://jsonfeed.org/version/1',
    title: FEED_TITLE,
    home_page_url: `${SITE_HOST}/`,
    feed_url: `${SITE_HOST}/feed.json`,
    items: posts.map(({ Component, urlPath, meta, tableOfContents }) => ({
      id: urlPath,
      url: `${SITE_HOST}${urlPath}`,
      title: meta.title,
      date_published: dayjs(meta.date).toISOString(),
      content_text: ReactDOMServer.renderToStaticMarkup(
        <RendererProvider renderer={createFelaRenderer()}>
          <Component meta={meta} tableOfContents={tableOfContents} pages={pages} />
        </RendererProvider>
      )
    }))
  })
}

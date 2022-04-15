import { Title, Meta, Link } from 'react-head'
import { useFela } from 'react-fela'
import favicon from './favicon.png'
import { DocsLayout } from '../components/DocsLayout'

export function DefaultLayout({ meta, pages, children }) {
  const { css } = useFela()
  return (
    <div role='main'>
      {meta.title ? <Title>{meta.title}</Title> : null}
      {meta.description ? <Meta name='description' content={meta.description} /> : null}
      <Link rel='icon' type='image/png' href={favicon} />
      <DocsLayout
        nav={
          <ul>
            {[
              '/docs/',
              '/docs/pages/',
              '/docs/components/',
              '/docs/browser-js/',
              '/docs/layouts/',
              '/docs/json-feed/',
              '/docs/comparisons/'
            ].map((url) => {
              const { meta } = pages[url]
              return (
                <li key={url}>
                  <a href={url}>{meta.title}</a>
                </li>
              )
            })}
          </ul>
        }
        page={children}
        title={meta.title}
      />
    </div>
  )
}

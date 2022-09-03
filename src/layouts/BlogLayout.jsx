import { Title, Meta, Link } from 'react-head'
import { useFela } from 'react-fela'
import favicon from './favicon.png'
import { DocsLayout } from '../components/DocsLayout'

export function BlogLayout({ meta, pages, children }) {
  const { css, renderer } = useFela()

  // .sr-only class on "Footnotes" heading injected by remark-gfm
  // https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  renderer.renderStatic({
    position: 'absolute !important',
    width: '1px !important',
    height: '1px !important',
    padding: '0 !important',
    margin: '-1px !important', // Fix for https://github.com/twbs/bootstrap/issues/25686
    overflow: 'hidden !important',
    clip: 'rect(0, 0, 0, 0) !important',
    whiteSpace: 'nowrap !important',
    border: '0 !important',
  }, '.sr-only')

  renderer.renderStatic({
    fontSize: '0.9rem !important',
    lineHeight: '1.5 !important'
  }, '.littlefoot-footnote__content')

  return (
    <div role='main'>
      {meta.title ? <Title>{meta.title}</Title> : null}
      {meta.description ? <Meta name='description' content={meta.description} /> : null}
      <Link rel='icon' type='image/png' href={favicon} />
      <DocsLayout
        page={children}
        title={meta.title}
      />
    </div>
  )
}

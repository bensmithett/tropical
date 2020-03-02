import React from 'react'
import { Helmet } from 'react-helmet'
import Background from '../components/background/background'
import DocsLayout from '../components/docs_layout/docs_layout'
import Header from '../components/header/header'
import Markdown from '../components/markdown/markdown'
import favicon from '../images/favicon.png'

export default function DefaultLayout ({ meta, children }) {
  return (
    <Background wide>
      <Helmet>
        <title>{meta.title}</title>
        <meta name='description' content={meta.description} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='alternate' href='/feed.json' type='application/json' />
        <link rel='icon' href={favicon} />
      </Helmet>

      <Header />
      <DocsLayout>
        <Markdown>
          {children}
        </Markdown>
      </DocsLayout>
    </Background>
  )
}

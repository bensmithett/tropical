import React from 'react'
import { Helmet } from 'react-helmet'
import Background from '../components/Background/Background'
import DocsWrapper from '../components/DocsWrapper/DocsWrapper'
import Header from '../components/Header/Header'
import Markdown from '../components/Markdown/Markdown'
import favicon from './favicon.png'

export default function DocsLayout ({ meta, children }) {
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
      <DocsWrapper>
        <Markdown>
          {children}
        </Markdown>
      </DocsWrapper>
    </Background>
  )
}

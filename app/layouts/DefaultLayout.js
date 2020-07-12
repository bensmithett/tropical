import React from 'react'
import { Helmet } from 'react-helmet'
import Background from '../components/Background/Background'
import Banner from '../components/Banner/Banner'
import Markdown from '../components/Markdown/Markdown'
import favicon from './favicon.png'

export default function DefaultLayout ({ meta, children }) {
  return (
    <Background>
      <Helmet>
        <title>{meta.title}</title>
        <meta name='description' content={meta.description} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='alternate' href='/feed.json' type='application/json' />
        <link rel='icon' href={favicon} />
      </Helmet>
      <Banner />
      <Markdown>{children}</Markdown>
    </Background>
  )
}

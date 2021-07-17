import React from 'react'
import { Title, Meta, Link } from 'react-head'
import { useFela } from 'react-fela'
import favicon from './favicon.png'
import { Background } from '../components/Background'
import { Banner } from '../components/Banner'
import { HomeText } from '../components/HomeText'

export function HomeLayout({ meta, pages, children }) {
  const { css } = useFela()
  return (
    <Background>
      <div role='main'>
        {meta.title ? <Title>{meta.title}</Title> : null}
        {meta.description ? <Meta name='description' content={meta.description} /> : null}
        <Link rel='icon' type='image/png' href={favicon} />

        <Banner />
        <HomeText>{children}</HomeText>
      </div>
    </Background>
  )
}

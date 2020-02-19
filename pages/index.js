export const meta = {
  title: 'Your San Blas site',
  description: ''
}

import React from 'react'
import { Helmet } from 'react-helmet-async'
import WelcomeBanner from '../components/welcome_banner/welcome_banner'
import PostList from '../components/post_list/post_list'
import { asIsland } from '../isomorphic_helpers'

const WelcomeBannerIsland = asIsland('WelcomeBanner', WelcomeBanner)

export default function IndexPage ({ posts }) {
  return (
    <>
      <WelcomeBannerIsland alertMessage='An yeel itoe' />
      <PostList posts={posts} />
    </>
  )
}

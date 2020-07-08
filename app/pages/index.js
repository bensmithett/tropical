// Example of a page written as a React component in a .js file.

// Every page should export a `meta` object with at least a title and description.
export const meta = {
  title: 'Your Tropical site',
  description: ''
}

import React from 'react'
import { Helmet } from 'react-helmet-async'
import PostList from '../components/post_list/post_list'

/*
By default, React components are only used to build your prerendered HTML.

If you want to automatically rehydrate on the client (aka isomorphic/universal) you can
wrap your original component with the `asIsland` higher order component for use in pages.
*/
import { WelcomeBannerIsland } from '../components/welcome_banner/welcome_banner'

export default function IndexPage ({ posts }) {
  return (
    <>
      <WelcomeBannerIsland alertMessage='Hello!' />
      <PostList posts={posts} />
    </>
  )
}

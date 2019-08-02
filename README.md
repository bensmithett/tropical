# San Blas 🏝

A simple static site generator that doesn't do much. Use React components to build fast, mostly-content websites that have islands of interactivity.

## Features

San Blas doesn't do

- ❌ hot reloading
- ❌ code splitting
- ❌ [lazy loading](https://www.bensmithett.com/an-argument-against-lazy-loading/)
- ❌ "instant" client side page transitions
- ❌ Progressive Web App™ anything
- ❌ isomorphic
- ❌ graphql
- ❌ serverless
- ❌ referring to itself as ["blazing fast"](https://github.com/search?q=blazing+fast)

## Why?

React's component model is the best way to compose chunks of HTML into a web page. It's so superior to its predecessors that we can mostly just forget that server-side templating languages ever existed.

When it comes to client-side interactivity, everyone's favourite hammer is React's killer feature: ✨ isomorphic JS ✨

In reality, many sites don't need to be coated in a thick layer of rich client-side interactivity. There may be a hamburger nav, newsletter subscription form & a couple of modals that are a good fit for React, but also a bunch of text content, images & some third party iframe embeds that will never be re-rendered.

I like to think of these pages as having 🏝 **islands of interactivity** 🏝 in a sea of otherwise static content.

San Blas works for that. Make HTML with components, sprinkle on decoupled client-side behaviour with whatever you like (including React).

## What?

- Metalsmith for the "static site generator" part
- Fela for styled React
- todo: https://github.com/developit/htm

## TODO

- Production build:
  - ensure `NODE_ENV=production` for React optimisations
  - Static asset revving. Webpack should be enough, but see also https://github.com/plantain-00/rev-static
- Recipes:
  - Blog (add metalsmith bits)
  - Adding more Babel bits

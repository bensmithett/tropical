# San Blas 🏝

A simple static site generator for the component era. Use modern tools to build fast, mostly-just-prerendered-HTML websites with islands of interactivity.

## Features

San Blas doesn't do…

- ❌ hot module reloading
- ❌ code splitting
- ❌ [lazy loading](https://www.bensmithett.com/an-argument-against-lazy-loading/)
- ❌ "instant" client side page transitions
- ❌ Progressive Web App™
- ❌ isomorphic (not the kind you're used to anyway)
- ❌ graphql
- ❌ workers
- ❌ ["blazing fast"](https://github.com/search?q=blazing+fast) or ["zero config"](https://github.com/search?q=zero+config)

Those things are great for some sites. San Blas just has different goals:

**🚀 Great performance can be simple.**
Complex performance hacks can be useful for certain kinds of sites and benchmarks, but come with their own tradeoffs. Often the basics are enough.

**♻️ Rethink isomorphic JS.**
Code reuse is valuable, but mostly-content websites usually don't need to re-render the entire page on the client.

**⚛️ Components should be developed in isolation.**
Building a plane while flying it is hard. Hot reloading the plane is harder. Build components in a dedicted [component development environment](https://storybook.js.org/) and drastically simplify the main app's dev server.

**🧬 Write meaningful, dynamic styles. Ship atomic CSS.**

**🤷‍♀️ Prefer flexibility over out-of-the-box functionality.** The stuff we build is too varied for a one-size-fits-all _Rails for frontend_. Avoid a configurable black box; keep things simple enough to hack directly to suit requirements.

## What you get

- Build **[React](https://reactjs.org/)** components in **[Storybook](https://storybook.js.org/)**
- Dynamic, component-centric styling & generated atomic classes by **[Fela](http://fela.js.org/)**
- **[React Helmet Async](https://github.com/staylor/react-helmet-async/)** for `head` management
- **[Webpack](https://webpack.js.org/)** for bundling, asset revving & a simple dev server
- **[Babel](https://babeljs.io/)** so you can write JSX and ES2030
- Decoupled client & server builds:
  - **Server:** Build static site assets from your `pages`
  - **Client:** Full control over the client JS bundle (if any) to enhance parts of your prerendered HTML. Mix and match React components (isomorphic or client-only) with vanilla JS and other libraries… the power is yours!
  - Sensible `development` and `production` builds.
- San Blas `<Island>` & `withIsland()` helpers for easy, targeted, isomorphic React.

Not feeling these defaults? **Change them!** San Blas is a template repo, not a black box library with config options you need to learn.

## `<Island>` in the sun

Isomorphic React is often approached with one big assumption: render the same component (usually the full page) into the same container node in both the prerendering and client environments.

That's reasonable if the page is coated in a thick layer of client side interactivity. But if you just need to enhance a mostly-static-content page with a hamburger menu and a couple of modals, there's no need to bundle up the entire page's dependencies to load and re-render on the client.

I like to think of these pages as having 🏝 **islands of interactivity** 🏝 in a sea of otherwise static content.

`<Island>` and `withIsland()` are simple helpers for prerendering an isomorphic React component:

```es6
// Use the withIsland() higher order component
const NavIsland = withIsland(Nav)
<NavIsland links={['home', 'about']} />

// or the old-fashioned Island component
<Island
  hydrateAs='Nav'
  component={Nav}
  componentProps={{ links: ['home', 'about'] }}
/>

// Both render this:
// <div data-sanblas-hydrate-as='Nav' data-sanblas-hydrate-with='{\"links\":[\"home\",\"about\"]}'>
//   (whatever <Nav links={['home', 'about']} /> renders)
// </div>
```

San Blas' client runtime will find this HTML and [`hydrate`](https://reactjs.org/docs/react-dom.html#hydrate) it with the same isomorphic component and props that it was prerendered with.


## TODO

- Production build:
  - Clean output folder (tricky with standalone webpack builds - see TODO in build script config to avoid)
  - Static asset revving. Webpack should be enough, but see also https://github.com/plantain-00/rev-static
- Recipes:
  - Blog (add metalsmith bits)
  - Adding more Babel bits
  - Preact
  - styled-componentsish API & [writing normal css](https://github.com/jxnblk/css-to-object)
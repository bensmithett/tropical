# San Blas 🏝

A straightforward static site generator for the component era. Use modern tools to build fast, mostly-just-prerendered-HTML websites with islands of interactivity.

## Features

San Blas doesn't do…

- ❌ hot module reloading
- ❌ code splitting
- ❌ [lazy loading](https://www.bensmithett.com/an-argument-against-lazy-loading/)
- ❌ "instant" client side page transitions
- ❌ Progressive Web App™
- ❌ isomorphic (not the full-page kind you're used to anyway)
- ❌ graphql
- ❌ workers
- ❌ ["blazing fast"](https://github.com/search?q=blazing+fast) or ["zero config"](https://github.com/search?q=zero+config)

Those things are great for some sites. San Blas just has different priorities:

**🚀 Great performance can be simple.**
Complex performance optimisations can be useful for some sites and benchmarks, but come with their own tradeoffs. Often the basics are enough.

**♻️ Rethink isomorphic JS.**
Code reuse is valuable, but mostly-content websites usually don't need to re-render the entire page on the client.

**⚛️ Components are best developed in isolation.**
Building a plane while it's flying is hard. Hot reloading the plane is harder. Build components in a dedicted [component development environment](https://storybook.js.org/) and drastically simplify the main app's dev server.

**🧬 Write meaningful, dynamic styles. Ship atomic CSS.**

**🤷‍♀️ Prefer flexibility over out-of-the-box functionality.** Avoid a configurable black box. Keep it simple enough to hack directly.

## What you get

- Build **[React](https://reactjs.org/)** components in **[Storybook](https://storybook.js.org/)**
- Dynamic, component-centric styles & generated atomic classes by **[Fela](http://fela.js.org/)**
- **[React Helmet Async](https://github.com/staylor/react-helmet-async/)** for `head` management
- **[Webpack](https://webpack.js.org/)** for bundling & asset revving
- **[Serve](https://github.com/zeit/serve)** for a dead simple dev server
- **[Babel](https://babeljs.io/)** so you can write JSX and ES2030
- Decoupled client and prerender builds:
  - **Prerender (aka server-render aka snapshot):** Build HTML and other assets from `pages` entrypoints
  - **Client:** Progressively enhance prerendered HTML. Mix and match React components (isomorphic or client-only) with vanilla JS and other libraries
- San Blas `withIsland()` higher order component for easy, targeted isomorphic React

Not feeling these defaults? **Change them!** San Blas is a template repo, not a black box library that you need to learn to configure.

## Documentation

San Blas' `package.json` comes with 3 scripts:

- `yarn storybook`: Start Storybook
- `yarn start`: Build the site in `development` mode & serve it at http://localhost:5000
- `yarn build`: Build the site in `production` mode into the `output` directory

### `entrypoints/prerender.js`

This module's default export is a function that builds your site's HTML files.

Provided is a basic prerender function that renders a page for each React component in the `pages` directory, but you can prerender your HTML pages however you like!

There's a vast ecosystem of existing tools like [Gulp](https://gulpjs.com/), [Metalsmith](https://metalsmith.io/) & [Hexo](https://hexo.io/) for rendering HTML, parsing Markdown, generating RSS feeds, etc, that you can take advantage of alongside modern staples like React, Webpack & Babel.

### `entrypoints/client.js`

This is the client JS bundle loaded by your pages. Use it to enhance your prerendered HTML with client-side JS.

The provided client bundle does a few things by default. You can 🔥 these defaults and/or add any client-side JS you like!

#### Rehydrate Fela styles

If you use Fela in your client bundle (including in any components), you need to [rehydrate](https://fela.js.org/docs/api/fela-dom/rehydrate.html) fela-dom's cache from prerendered styles.

#### Rehydrate prerendered San Blas `Island` components

San Blas provides the `Island` component and the `withIsland` [HOC](https://reactjs.org/docs/higher-order-components.html) to simplify rendering & rehydrating isomorphic React components.

To do that, isomorphic components must be imported into the client bundle & made available for San Blas to [`hydrate`](https://reactjs.org/docs/react-dom.html#hydrate) when it finds a prerendered `Island`.

### `components/island/island.js`

The San Blas `Island` provides a simple method to prerender an isomorphic React component and have the client JS bundle automatically rehydrate it with the same props it was prerendered with.

#### Example

Say you have a `Nav` component that accepts a single `links` prop:

```js
const Nav = ({ links = [] }) => (
  <nav>
    {links.map((link) => (
      <a href={link} onClick={() => alert('🏝')}>{link}</a>
    ))}
  </nav>
)
```

When decorated with `withIsland()` this component will prerender some HTML like this:

```html
<div data-sanblas-hydrate-as='Nav' data-sanblas-hydrate-with='{\"links\":[\"home\",\"about\"]}'>
  <nav>
    <a href='home'>home</a>
    <a href='about'>about</a>
  </nav>
</div>
```

The client bundle will find it and [`hydrate`](https://reactjs.org/docs/react-dom.html#hydrate) it.

#### `withIsland()`

```js
withIsland(Component, { islandTag, islandString, hydrateAs })
```

Returns a React component that will render the supplied component with the supplied props, wrapped in an element with special `data-` attributes as per the above example.

##### Parameters

###### `Component` (required)

Any React component whose props can be serialised with `JSON.stringify`.

###### `options.islandTag` 

Type: `String`
Default: `'div'`

Name of the HTML tag the component should be wrapped with.

###### `options.islandProps`

Type: `Object`
Default: `{}`

Props (i.e. HTML attributes) to apply to the wrapper element.

###### `hydrateAs`

Type: `String`
Default: `displayName` or `name` of the passed `Component`

Component key in `componentMap` in `entrypoints/client.js`


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
- Recipes:
  - Blog (add metalsmith bits)
  - Adding more Babel bits
  - Preact
  - styled-componentsish API & [writing normal css](https://github.com/jxnblk/css-to-object)
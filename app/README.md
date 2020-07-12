# Tropical's 4 core files

## `build.js`

A script run in Node.js that:

- Uses Webpack to compile `prerender.js` and `client.js` so they can run, respectively, in Node.js and the browser.
- Calls the default export of `prerender.js` to (you guessed it!) prerender your static site.

## `client.js`

The JS file loaded by all pages in a `<script>` tag in the browser.

If using Tropical's `asIsland` helper to enable component hydration, import those components into this file and pass them to `hydrateIslands`.

## `hydrationHelpers.js`

Optional helpers for enabling targeted component [hydration](https://reactjs.org/docs/react-dom.html#hydrate) (see below).

## `prerender.js`

Prerenders your static site:

- Builds a HTML file from every `.js` or `.mdx` page in `pages`
- Builds a [JSON Feed](https://www.jsonfeed.org/) containing every page with `collection: 'posts'` in its metadata

## Hydration helpers

### `asIsland(componentName, Component, options)`

A [higher order component](https://reactjs.org/docs/higher-order-components.html) that annotates your prerendered components for hydration by `hydrateIslands`.

#### Props

- `componentName`: the name of the component, as configured in `hydrateIslands` *(string, required)*
- `Component`: any React component whose props can be serialised with `JSON.stringify` *(React component, required)*
- `options`: *(object)*
  - `islandTag`: the HTML element to wrap the component with *(string, default: 'div')*
  - `islandProps`: any props to be passed to the island element *(object, default: {})*

### `hydrateIslands(components)`

Hydrates any components in the browser that were prerendered using `asIsland`.

#### Props

- `components`: an object containing the components to be hydrated *(object, required)*

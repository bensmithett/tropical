# 3. Don't default to full-page isomorphic React

**Date: 2019-09-03**

## Context

**Isomorphic React** is the practice of server-rendering a page composed (fully or partly) of React components, then using those same components in the browser to "hydrate" the server-rendered markup with client-side behaviour (e.g. event listeners).

I have experience with 3 big players that can build static sites using isomorphic React:

- [Create React App](https://github.com/facebook/create-react-app) (with [react-snap](https://github.com/stereobooster/react-snap/))
- [Gatsby](https://www.gatsbyjs.org/)
- [Next.js](https://nextjs.org/)

They all share an approach we can call "full-page isomorphic React". The entire page is a single root React component composed of as many other components as you need. 

A consequence of this approach is that, in order to hydrate that root component, a client JS bundle must include all of its dependencies. Every component you used to prerender your page must be sent to the client, regardless of whether that particular component really *needs* to add any client side behaviour.

When the client behaviour you're adding is relatively minimal (e.g. just a hamburger menu & a couple of modals) you end up loading & executing far more client side JS than is strictly necessary. And because you built the page in React, you automatically add that client side behaviour the React way. This can mean loading all of React and your component dependencies in cases where a one-liner `addEventListener` may do the trick, or where you're doing something with a vanilla DOM library.

I want to try a different approach:

- Instead of full-page isomorphic React, provide a way to do *targeted* isomorphic React so that client bundles only need include the components that actually enhance the prerendered HTML with client side behaviour.
- Make *any* isomorphic React completely optional by decoupling the client & prerender entrypoints to enable React-free client side behaviour.

## Decision

Don't default to full-page isomorphic React. Provide a way to target & enhance isomorphic components *within* a prerendered page. Make it possible to eschew client-side React completely.

## Consequences

- Smaller, faster client-side JS bundles.
- Targeted isomorphic React with the `withIsland` approach requires manually importing the correct components into the client side bundle.

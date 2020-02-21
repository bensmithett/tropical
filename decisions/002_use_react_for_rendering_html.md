# 2. Use React for rendering HTML

**Date: 2019-08-30**

## Context

### Keeping the component paradigm

Ignoring its client side capabilities, I firmly believe that React, or a React-like approach, is the best option for prerendering (or server-rendering) HTML.

The component paradigm it introduced (custom "elements" that can accept arbitrary children, just like HTML can) and the HTML-like JSX syntax, are light years ahead of the string templating approaches that came before it (and still widely persist). Entire categories of problem disappear - remember the havoc an accidental extra `</div>` in an ERB or PHP template would cause? Or the awkwardness of hamstrung, template-specific conditionals and loops?

Then there's the shift toward defining component styles alongside the component itself rather than in a distant CSS file, and (in hindsight) the natural subsequent rise of CSS-in-JS. Another entire category of problems that we used to call "CSS Architecture" mostly disappears.

My aim for this project is a simpler static site generator but I didn't want to throw away those lessons.

### Failed first attempt: [htm](https://github.com/developit/htm)

Keeping React's component paradigm doesn't necessarily mean keeping React & JSX. It wasn't my first choice.

#### Can I avoid Webpack and Babel?

I'd [already selected](./001_use_fela.md) a pure JS CSS approach that didn't require any special transpiling or bundling. Wouldn't it keep things simple if *everything* was just plain JS and my build script was just plain JS I could run directly in Node?

That ruled out JSX and I didn't want to start writing `React.createElement` by hand.

`htm` appeared to solve my JSX problem and would let me use React (or Preact) without transpiling.

While I still think `htm` is cool, I fell back to JSX for a couple of reasons:

##### I need Webpack and Babel anyway

- I wanted to write modern JS that would need to be transpiled to run in Node and browsers.
- I wanted to write modular code, which would need bundling for browsers
- I wanted to keep Webpack's front-end-aware dependency management. I had pure JS CSS, but I still wanted to declare dependencies on images & fonts.

Adding `@babel/preset-react` to that setup to support JSX really doesn't add much complexity.

##### JSX is well known

JSX is a de facto standard for working with React-like components and has great editor support.

I'm already pushing my luck a bit by defaulting to Fela for CSS rather than a more well known option like CSS Modules or styled-components.

Without the justification of a simpler Babel-less build, `htm` only adds complexity by forcing people to learn this new thing that isn't the de facto standard they're used to.

## Decision

Use React and JSX syntax for building components for both prerendered HTML generation and (optionally) in the browser environment.

## Consequences

- JSX requires a transpile step (Babel)
- `react` and `react-dom` add >100kb to a client bundle, which is a lot for the kind of site this project is used for. As such, this project should make it easy to:
  - Only use React for prerendering (don't enforce it for the client bundle)
  - Switch out React for Preact

# 1. Use Fela for CSS

**Date: 2019-08-30**

## Context

I always bought into the performance and rapid prototyping benefits of "atomic CSS" approaches like [Tachyons](https://tachyons.io/), [Basscss](https://basscss.com/), [AMCSS](https://amcss.github.io/) and [Atomic CSS](https://acss.io/), I never quite got over the fact that they all required you to learn a new DSL: the special classnames or attributes defined by the author which maps to some real CSS properties. I just wanted to write the CSS I already know directly.

So I've been enamoured with the idea of auto-generated, single-purpose CSS classes for a long time. When Ryan Tsao [introduced](https://ryantsao.com/blog/virtual-css-with-styletron) [Styletron](https://www.styletron.org/) I immediately wanted to start using it everywhere. Around the same time, Robin Frischmann released [Fela](http://fela.js.org/).

### Make CSS performance a non-issue

A major benefit of the approach taken by these libraries is that the [growth of your app's CSS tapers off over time](https://ryantsao.com/blog/virtual-css-with-styletron#non-growing-stylesheets), rather than growing linearly as you add more styles, because it becomes more likely that a property/value combination can be reused.

For many kinds of site, this approach means the CSS needed for an entire page is negligible enough that it can be inlined in the `<head>`. For example, the [Tropical homepage](https://tropicaljs.netlify.app/) currently has around 3kb of inline `<style>` tags. After gzip, we're talking about roughly **1kb difference** to HTML payload size with the bonus of **zero network requests for CSS**.

Choosing to inline a page's atomic CSS allows me to sidestep extra build complexity ([CSS file extraction](https://webpack.js.org/plugins/mini-css-extract-plugin/)) and other popular but complex optimisations ([Critical CSS](https://www.smashingmagazine.com/2015/08/understanding-critical-css/), [splitting CSS into chunks](https://webpack.js.org/guides/code-splitting/)).

### Styletron vs Fela

Both Styletron and Fela are great and give you roughly the same thing. You write styles at the component level using the familiar CSS 'rule' approach (a bunch of properties grouped together that you intend to apply to a certain element) and the library gives you the atomic classnames to apply to that element.

The main difference I had to consider is Styletron explicitly [doesn't support](https://www.styletron.org/concepts/#selectors) combinators & child selectors. I don't disagree with their design decision, but it does get in the way of a couple of use cases I really want to support:
  - Markdown content, where you don't necessarily control the rendering of each element, so need to target them with descendent selectors (e.g. `.markdown > p`)
  - Descendent hover/focus styles. Styletron [provides a hook](https://www.styletron.org/concepts/#descendant-hover) for this, but I'd rather just use CSS.

## Decision

Use [Fela](http://fela.js.org/) for CSS.

## Consequences

- Generated atomic CSS introduces performance wins that mean I can basically forget other CSS performance optimisations (and their complexity)
- Styles need to be written as JS objects with camelCased JS property names, which might be a barrier to entry for some (and can be confusing, considering the values are still snake-cased)
  - Possibly can add a way to use tagged template literals to allow authoring in CSS syntax (e.g. [css-to-object](https://github.com/jxnblk/css-to-object), borrow/modify whatever styled-components is doing, or maybe even add something to Fela itself)

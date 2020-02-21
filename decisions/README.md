# Architecture Decision Records

[Architecture Decision Records](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions) (ADRs) have taken off in a pretty big way at [my day job](https://envato.com/).

They're a great way to document the *why* of a project's architectural decisions, keeping your other docs free of justifications and purely for documenting the *what*.

They're a really nice middle ground that allows you to capture context around decisions that might otherwise be spread across READMEs, pull request discussions, blog posts, in-person discussions or (in my case as the sole maintainer of this project) thoughts in my head.

## Drafts

In addition to existing ADRS I'm planning to retroactively add these:

- Template repo, not a library
- Use Webpack for module bundling & asset revving
- Simple dev server with no hot module reloading
- No client-side route transitions
- No code splitting
- No PWA

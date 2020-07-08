# Layouts

Layouts, a concept borrowed from [Rails](https://api.rubyonrails.org/classes/ActionView/Layouts.html), allow you to template the HTML _around_ your page content.

This could include things like:

- Tags for your `<head>`
- "Wrapper" divs, or a shared header, footer or sidebar

Unlike Rails, you don't need to directly template your layout's `html`, `head` or `body` tags. Instead, manage those tags with `Helmet` and the Tropical prerender function will put everything in the right place in the final rendered HTML document.

## Layout props

Layout components are rendered with 2 props:

- `meta` (object): the `meta` object exported by each page
- `children` (React Element): the page content

## Specifying a layout for a page

Pages use the `DefaultLayout` component unless another component is specified in the page's `meta.Layout`:

```js
import DifferentLayout from '../layouts/different_layout'

export const meta = {
  title: 'My Page Title',
  description: 'This page has a different layout',
  Layout: DifferentLayout
}
```

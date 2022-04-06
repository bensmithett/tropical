/*
<TropicalCodeBlock> is used by <Renderer> (in entry-server.jsx) to render MDX fenced code blocks, e.g.

```js
console.log('Hello world')
```

You can restyle it and change it to suit your needs. For more info:
https://mdxjs.com/guides/syntax-highlighting (Tropical currently does "Runtime" syntax highlighting — though only during prerendering)
https://github.com/react-syntax-highlighter/react-syntax-highlighter
*/

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export function TropicalCodeBlock ({ children, language }) {
  return (
    <SyntaxHighlighter language={language} style={dracula} customStyle={{ fontSize: '0.9rem' }}>
      {children}
    </SyntaxHighlighter>
  )
}

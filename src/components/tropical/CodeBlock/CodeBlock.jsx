/*
<CodeBlock> is used by <Renderer> (in entry-server.jsx) to render MDX fenced code blocks.

You can restyle it, use a different theme, or otherwise change it to suit your needs.
Just don't delete it or change the props API, or MDX rendering will break.

For more info:
https://mdxjs.com/guides/syntax-highlighting (Tropical currently does "Runtime" syntax highlighting — though only during prerendering)
https://github.com/react-syntax-highlighter/react-syntax-highlighter
*/

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export function CodeBlock ({ children, language }) {
  return (
    <SyntaxHighlighter language={language} style={dracula} customStyle={{ fontSize: '0.9rem' }}>
      {children}
    </SyntaxHighlighter>
  )
}

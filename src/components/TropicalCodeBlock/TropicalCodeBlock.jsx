import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import dracula from 'prism-react-renderer/themes/dracula'

/* 
To add language support outside the subset that comes with prism-react-renderer
https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js

import Prism from 'prism-react-renderer/prism';
;(typeof global !== 'undefined' ? global : window).Prism = Prism
import 'prismjs/components/prism-ruby'
*/

export function TropicalCodeBlock({ children, className }) {
  const language = className?.replace(/language-/, '')

  return (
    <Highlight {...defaultProps} code={children.trim()} language={language} theme={dracula}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px', fontSize: '0.9rem', overflow: 'auto' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

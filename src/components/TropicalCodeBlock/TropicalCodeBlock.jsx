/*
This component is used to render MDX fenced code blocks (```)
You can change it to suit your needs. For more info:
https://mdxjs.com/guides/syntax-highlighting
https://github.com/FormidableLabs/prism-react-renderer

⚠️ prism-react-renderer only highlights certain languages by default:
https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js

To add more languages, uncomment this and import the syntax you need: */
// import Prism from 'prism-react-renderer/prism';
// ;(typeof global !== 'undefined' ? global : window).Prism = Prism
// import 'prismjs/components/prism-ruby'

import React from 'react'
import { useFela } from 'react-fela'
import Highlight, { defaultProps } from 'prism-react-renderer'
import dracula from 'prism-react-renderer/themes/dracula'

export function TropicalCodeBlock({ children, language }) {
  const { css } = useFela()

  // Tropical tweaks to the dracula theme
  const tropicalOverrideStyles = css({
    borderRadius: '4px',
    fontSize: '0.9rem',
    overflow: 'auto',
    padding: '15px'
  })

  return (
    <Highlight {...defaultProps} code={children.trim()} language={language} theme={dracula}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} ${tropicalOverrideStyles}`} style={{ ...style }}>
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

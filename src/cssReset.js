export default function cssReset (felaRenderer) {
  felaRenderer.renderStatic({
    boxSizing: 'border-box',
    fontSize: '16px',
    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    lineHeight: 1.5,
    margin: 0
  }, ':root')

  felaRenderer.renderStatic({
    boxSizing: 'inherit',
  }, '*, *:before, *:after')

  felaRenderer.renderStatic({
    margin: 0
  }, 'body')
}

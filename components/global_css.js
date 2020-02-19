export function cssReset (felaRenderer) {
  felaRenderer.renderStatic({
    fontSize: '16px',
    fontFamily: 'sans-serif',
    lineHeight: 1.5,
    margin: 0
  }, 'body')
}

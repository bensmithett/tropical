module.exports = function evaluatePrerenderBundle (source, mode) {
  let prerender
  try {
    prerender = eval(source).default
  } catch (err) {
    console.error('evaluatePrerenderBundle: Error evaluating webpacked prerender bundle.')
    console.error(err)
  }

  if (typeof prerender !== 'function') {
    console.error(`evaluatePrerenderBundle: Webpacked prerender bundle did not export a function, got "${typeof prerender}"`)
  }

  prerender('TODO: pass filename for client JS')
}

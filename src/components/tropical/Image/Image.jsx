export function Image({ src: importedImage, ...imgProps }) {
  if (typeof importedImage === 'string') return <img src={importedImage} {...imgProps} />

  const { srcset, ...imgPropsFromImport } = importedImage[importedImage.length - 1]
  return <img srcSet={srcset} {...imgPropsFromImport} {...imgProps} />
}

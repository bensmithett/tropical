export function Picture({
  src: importedImage,
  children = (imgProps) => <img {...imgProps} />,
  ...pictureProps
}) {
  if (typeof importedImage === 'string')
    throw new Error(
      `A string 'src' was passed to <Picture>. If you don't need multiple <source>'s, use <Image> instead.`
    )

  return (
    <picture {...pictureProps}>
      {importedImage.map(({ srcset, ...sourceOrImgProps }, i) =>
        i < importedImage.length - 1 ? (
          <source srcSet={srcset} {...sourceOrImgProps} key={i} />
        ) : (
          children({ srcSet: srcset, ...sourceOrImgProps, key: i })
        )
      )}
    </picture>
  )
}

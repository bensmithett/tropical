import { Image } from './Image'
import { useFela } from 'react-fela'
import singleFormat from '../gunayala.jpg?preset=singleFormatExample'
import singleFormatSrc from '../gunayala.jpg?preset=singleFormatExample&src'
import singleFormatSrcset from '../gunayala.jpg?preset=singleFormatExample&srcset'
import multiFormat from '../gunayala.jpg?preset=multiFormatExample'

export default { title: 'tropical/Image' }

export const Unstyled = () => <Image src={singleFormat} width='500' />

export const Styled = () => {
  const { css } = useFela()
  return (
    <Image
      src={singleFormat}
      className={css({ width: '100%', border: '2px dashed rebeccapurple' })}
      alt='Guna Yala'
      width='500'
    />
  )
}

export const ManualSrcAndSrcset = () => (
  <Image src={singleFormatSrc} srcSet={singleFormatSrcset} width='500' />
)

export const IgnoresRedundantSources = () => <Image src={multiFormat} width='500' />

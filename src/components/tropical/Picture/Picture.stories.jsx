import { Picture } from './Picture'
import { useFela } from 'react-fela'
import multiFormat from '../gunayala.jpg?preset=multiFormatExample'
import multiFormatSrc from '../gunayala.jpg?preset=multiFormatExample&src'
import multiFormatSrcset from '../gunayala.jpg?preset=multiFormatExample&srcset'

export default { title: 'tropical/Picture' }

export const DefaultImg = () => <Picture src={multiFormat} />

export const StyledImg = () => {
  const { css } = useFela()
  return (
    <Picture src={multiFormat}>
      {(imgProps) => (
        <img
          {...imgProps}
          className={css({
            maxWidth: '100%',
            border: '2px dashed rebeccapurple'
          })}
          width='500'
        />
      )}
    </Picture>
  )
}

export const StyledPictureAndImg = () => {
  const { css } = useFela()
  return (
    <Picture
      src={multiFormat}
      className={css({ display: 'block', border: '5px dashed chartreuse' })}
    >
      {(imgProps) => (
        <img
          {...imgProps}
          className={css({
            maxWidth: '100%',
            border: '2px dashed rebeccapurple'
          })}
          width='500'
        />
      )}
    </Picture>
  )
}

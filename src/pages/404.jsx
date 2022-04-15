export const meta = {
  title: '404 Not Found'
}

import { useFela } from 'react-fela'

export default function NotFoundPage ({ meta, pages }) {
  const { css } = useFela()
  return (
    <p className={css({ color: 'orange' })}>Not Found</p>
  )
}

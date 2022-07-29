import { useFela } from 'react-fela'

export function Picture({ sources }) {
  const { css } = useFela()

  return (
    <div>{
      JSON.stringify(sources)
    }</div>
  )
}

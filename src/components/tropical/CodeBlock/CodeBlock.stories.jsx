import { CodeBlock } from './CodeBlock'

export default { title: 'tropical/CodeBlock' }

export const JS = () => (
  <CodeBlock language='javascript'>{`function relax() {
  console.log('Welcome to Tropical')
}`}</CodeBlock>
)

export const JSX = () => (
  <CodeBlock language='jsx'>{`function Relax ({ drink = 'Singapore Sling' }) {
  return (
    <div>
      <Cocktail drink={drink} />
    </div>
  )
}`}</CodeBlock>
)

export const Ruby = () => (
  <CodeBlock language='ruby'>{`def relax (drink = 'Singapore Sling')
  puts "Welcome to Tropical! Enjoy a #{drink}."
end`}</CodeBlock>
)

export const NoLanguage = () => (
  <CodeBlock>{`This is
      not
  any particular
        language`}</CodeBlock>
)

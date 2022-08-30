import { TableOfContents } from './TableOfContents'
import { tableOfContents } from './example.mdx'

export default { title: 'tropical/TableOfContents' }

export const Basic = () => <TableOfContents tableOfContents={tableOfContents} />

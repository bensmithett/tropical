export function TableOfContents({ tableOfContents }) {
  return tableOfContents.length && <List list={tableOfContents} />
}

function List({ list }) {
  return (
    <ul>
      {list.map(({ value, id, children }) => (
        <li key={id}>
          <a href={`#${id}`}>{value}</a>
          {children && <List list={children} />}
        </li>
      ))}
    </ul>
  )
}

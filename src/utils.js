import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
dayjs.extend(isSameOrBefore)

export function pagesWithTag(pages, tag, sorter = sortByDateDescending) {
  return Object.values(pages).filter(({ meta }) => meta.tags?.includes(tag)).sort(sorter)
}

function sortByDateDescending(a, b) {
  const dayA = a.meta?.date && dayjs(a.meta.date)
  const dayB = b.meta?.date && dayjs(b.meta.date)

  if (!dayA?.isValid()) throw new Error(`Invalid meta.date exported from ${a.modulePath}`)
  if (!dayB?.isValid()) throw new Error(`Invalid meta.date exported from ${b.modulePath}`)

  return dayA.isSameOrBefore(dayB) ? 1 : -1
}

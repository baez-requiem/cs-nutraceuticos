export function formatUTCDate(date: string): string {
  if (date.length === 10) {
    const arrDate = date.split("-")
  
    const y = arrDate[0]
    const m = arrDate[1]
    const d = arrDate[2]
  
    return `${d}/${m}/${y}`
  }

  const newDate = new Date(date)

  const y = newDate.getUTCDate().toString().padStart(2, '0')
  const m = (newDate.getUTCMonth()+1).toString().padStart(2, '0')
  const d = newDate.getUTCFullYear()

  return `${d}/${m}/${y}`
}
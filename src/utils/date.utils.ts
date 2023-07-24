export function formatUTCDate(date: string): string {
  if (date.length === 10) {
    const arrDate = date.split("-")

    const y = arrDate[0]
    const m = arrDate[1]
    const d = arrDate[2]

    return `${d}/${m}/${y}`
  }

  const newDate = new Date(date)

  const d = newDate.getUTCDate().toString().padStart(2, '0')
  const m = (newDate.getUTCMonth() + 1).toString().padStart(2, '0')
  const y = newDate.getUTCFullYear()

  return `${d}/${m}/${y}`
}

export function formatDate(date: string | Date): string {
  if (typeof date === 'string' && date.length === 10) {
    const arrDate = date.split("-")

    const y = arrDate[0]
    const m = arrDate[1]
    const d = arrDate[2]

    return `${d}/${m}/${y}`
  }

  const newDate = new Date(date)

  const d = newDate.getDate().toString().padStart(2, '0')
  const m = (newDate.getMonth() + 1).toString().padStart(2, '0')
  const y = newDate.getFullYear()

  return `${d}/${m}/${y}`
}

export function formatUTCDateTime(date: string | Date): string {
  const newDate = new Date(date)

  const d = newDate.getUTCDate().toString().padStart(2, '0')
  const m = (newDate.getUTCMonth() + 1).toString().padStart(2, '0')
  const y = newDate.getUTCFullYear()

  const hour = newDate.getUTCHours().toString().padStart(2, '0')
  const min = newDate.getUTCMinutes().toString().padStart(2, '0')
  const sec = newDate.getUTCSeconds().toString().padStart(2, '0')

  return `${d}/${m}/${y} ${hour}:${min}:${sec}`
}

export function formatDateTime(date: string | Date): string {
  const newDate = new Date(date)

  const d = newDate.getDate().toString().padStart(2, '0')
  const m = (newDate.getMonth() + 1).toString().padStart(2, '0')
  const y = newDate.getFullYear()

  const hour = newDate.getHours().toString().padStart(2, '0')
  const min = newDate.getMinutes().toString().padStart(2, '0')
  const sec = newDate.getSeconds().toString().padStart(2, '0')

  return `${d}/${m}/${y} ${hour}:${min}:${sec}`
}

export function formatDateValue(date: string | Date, utc?: boolean): string {
  const newDate = new Date(date)

  if (utc) {
    const d = newDate.getUTCDate().toString().padStart(2, '0')
    const m = (newDate.getUTCMonth() + 1).toString().padStart(2, '0')
    const y = newDate.getUTCFullYear()

    return `${y}-${m}-${d}`
  }

  const d = newDate.getDate().toString().padStart(2, '0')
  const m = (newDate.getMonth() + 1).toString().padStart(2, '0')
  const y = newDate.getFullYear()

  return `${y}-${m}-${d}`

}

export function getStartMonthValue(date: Date, utc?: boolean): string {
  if (utc) {
    const year = date.getUTCFullYear()
    const month = date.getUTCMonth() + 1
    const startOfMonth = new Date(year, month - 1, 1)

    const formattedDate = startOfMonth.toISOString().slice(0, 10)

    return formattedDate
  }

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const startOfMonth = new Date(year, month - 1, 1)

  const formattedDate = startOfMonth.toISOString().slice(0, 10)

  return formattedDate
}

export function getEndMonthValue(date: Date, utc?: boolean): string {
  if (utc) {
    const year = date.getUTCFullYear()
    const month = date.getUTCMonth() + 1
    const startOfMonth = new Date(year, month, 0)

    const formattedDate = startOfMonth.toISOString().slice(0, 10)

    return formattedDate
  }

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const startOfMonth = new Date(year, month, 0)

  const formattedDate = startOfMonth.toISOString().slice(0, 10)

  return formattedDate
}

export function formatDocDateTime(date: Date | string, utc?: boolean): string {
  const newDate = new Date(date)

  const d = (utc ? newDate.getUTCDate() : newDate.getDate()).toString().padStart(2, '0')
  const m = ((utc ? newDate.getUTCMonth() : newDate.getMonth()) + 1).toString().padStart(2, '0')
  const y = utc ? newDate.getUTCFullYear() : newDate.getFullYear()

  const hour = (utc ? newDate.getUTCHours() : newDate.getHours()).toString().padStart(2, '0')
  const min = (utc ? newDate.getUTCMinutes() : newDate.getMinutes()).toString().padStart(2, '0')
  const sec = (utc ? newDate.getUTCSeconds() : newDate.getSeconds()).toString().padStart(2, '0')

  return `${d}-${m}-${y}---${hour}-${min}-${sec}`
}
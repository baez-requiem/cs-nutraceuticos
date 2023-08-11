export function jsonToCsv(jsonData: any[], includeHeader: boolean = true): string {
  if (jsonData.length === 0) return ''

  const keys = Object.keys(jsonData[0])
  const csvRows = []

  includeHeader && csvRows.push(keys.join(','));

  for (const item of jsonData) {
    const values = keys.map(key => {
      const value = item[key]

      return typeof value === 'string' ? `"${value}"` : value
    })

    csvRows.push(values.join(','))
  }

  return csvRows.join('\n')
}

export function downloadCsv(csv: string, fileName: string): void {
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.click()

  URL.revokeObjectURL(url)
}
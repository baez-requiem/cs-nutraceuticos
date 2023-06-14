export function mapObject<T, U>(obj: Record<string, T>, callback: (value: T) => U): Record<string, U> {
  const mappedObj: Record<string, U> = {}
  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      mappedObj[key] = callback(obj[key])
    }
  }
  
  return mappedObj
}

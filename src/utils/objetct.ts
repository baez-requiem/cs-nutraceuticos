export function mapObject<T, U>(obj: Record<string, T>, callback: (value: T) => U): Record<string, U> {
  const mappedObj: Record<string, U> = {}
  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      mappedObj[key] = callback(obj[key])
    }
  }
  
  return mappedObj
}

type AnyObject = { [key: string]: any }

export function removeNullAndEmptyFields(obj: AnyObject): AnyObject {
  const result: AnyObject = {}

  for (const key in obj) {
    const value = obj[key]

    if (value !== null && value !== "" && !(value instanceof Object)) {
      result[key] = value
    } else if (value instanceof Object) {
      const cleanedValue = removeNullAndEmptyFields(value)

      if (Object.keys(cleanedValue).length > 0) {
        result[key] = cleanedValue
      }
    }
  }

  return result;
}
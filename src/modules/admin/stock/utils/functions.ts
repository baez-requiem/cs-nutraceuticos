export function formatProducts(str: string) {
  const products = str.split('--')

  const productsArr = products.map(productInfos => {
    const infos = productInfos.split('__')

    return {
      name: infos[0],
      quantity: infos[1],
      amount: infos[2],
    }
  })

  return productsArr
}
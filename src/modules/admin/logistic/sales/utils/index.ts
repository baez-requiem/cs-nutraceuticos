import { jsPDF } from "jspdf"
import { Sale } from "src/services/api/logistic/logistic.types"
import { downloadCsv, jsonToCsv } from "src/utils/csv"
import { formatDate, formatDateTime, formatDocDateTime } from "src/utils/date.utils"
import { floatToReal, formatCEP, formatPhone } from "src/utils/number.utils"

export const hasShowPdfAction = (sale: Sale) => {
  let hasShow = !!(sale.address && sale.city)

  const li = sale.logistic_infos[0]

  !li.delivery_date && (hasShow = false);
  !li.delivery_value && (hasShow = false);
  !li.id_delivery_type && (hasShow = false);

  (li.id_delivery_type === 'motoboy' && !li.id_motoboy) && (hasShow = false);

  return hasShow
}

export const makeSalePDF = (sale: Sale) => {
  const doc = new jsPDF('p', 'px', [720, 480])

  let spaceY = 20

  doc.setFontSize(18)
  doc.text(`Resumo da venda #${sale.number.toString().padStart(5, '0')}`, 10, spaceY)

  spaceY += 10

  doc.setLineWidth(0.5)
  doc.line(10, spaceY, 470, spaceY)

  spaceY += 20

  doc.setFontSize(14)
  doc.text(`Data da venda: ${formatDateTime(sale.created_at)}`, 10, spaceY)
  doc.text(`Vendedor: ${sale.user.name}`, 260, spaceY)
  spaceY += 25
  doc.text(`Cliente: ${sale.name}`, 10, spaceY)
  doc.text(`Telefone: ${formatPhone(sale.phone)}`, 260, spaceY)
  spaceY += 25

  doc.text('Produtos', 10, spaceY)
  doc.text('Qntd.', 130, spaceY)
  doc.text('Valor Und.', 260, spaceY)
  doc.text('Total', 390, spaceY)

  spaceY += 15

  let totalAmount = 0

  sale.sale_products.forEach(sp => {
    doc.text(sp.product.name, 10, spaceY)
    doc.text(`${sp.quantity}x`, 130, spaceY)
    doc.text(`${floatToReal(sp.product.amount)}`, 260, spaceY)
    doc.text(`R$ ${floatToReal(sp.product.amount * sp.quantity)}`, 390, spaceY)

    totalAmount += (sp.product.amount * sp.quantity)
    spaceY += 15
  })

  spaceY -= 2.5

  doc.setLineWidth(0.1)
  doc.setDrawColor('#c1c1c1')
  doc.line(10, spaceY, 470, spaceY)

  spaceY += 15

  if (sale.discounts) {
    doc.text(`Desconto`, 10, spaceY)
    doc.setTextColor('#991b1b')
    doc.text(`- R$ ${floatToReal(sale.discounts)}`, 383.5, spaceY)

    spaceY += 12.5

    doc.setLineWidth(0.1)
    doc.setDrawColor('#c1c1c1')
    doc.line(10, spaceY, 470, spaceY)

    spaceY += 15
  }

  doc.setTextColor('black')
  doc.text(`R$ ${floatToReal(totalAmount - sale.discounts)}`, 390, spaceY)

  spaceY += 25

  doc.setFontSize(16)
  doc.text(`Dados do pagamento`, 10, spaceY)
  spaceY += 15

  doc.setFontSize(14)
  doc.text('Método', 10, spaceY)
  doc.text('Valor', 260, spaceY)
  doc.text('Situação', 390, spaceY)

  spaceY += 15
  sale.sale_payments.forEach(sp => {
    const creditCardTxt = sp.id_payment_type === 'credit_card' ? ` em ${sp.card_installments}x` : ''

    doc.text(`${sp.payment_type.name}`, 10, spaceY)
    doc.text(`${floatToReal(sp.amount)} ${creditCardTxt}`, 260, spaceY)
    doc.text(`${sp.paid ? 'Pago' : 'Cobrar'}`, 390, spaceY)
    spaceY += 15
  })

  spaceY += 15

  doc.setFontSize(16)
  doc.text('Dados da entrega', 10, spaceY)

  spaceY += 25

  doc.setFontSize(14)
  doc.text(`Tipo de entrega: ${sale.logistic_infos[0].delivery_type.name}`, 10, spaceY)
  if (sale.logistic_infos[0].delivery_type.id === 'motoboy') {
    doc.text(`Motoboy: ${sale.logistic_infos[0].motoboy.name}`, 260, spaceY)
  }

  spaceY += 15

  doc.text(`Data da entrega: ${formatDate(sale.logistic_infos[0].delivery_date)}`, 10, spaceY)
  doc.text(`Valor da entrega: R$ ${floatToReal(sale.logistic_infos[0].delivery_value)}`, 260, spaceY)

  spaceY += 25

  doc.text(`CEP: ${formatCEP(sale.cep)}`, 10, spaceY)
  doc.text(`Estado: ${sale.state.toUpperCase()}`, 260, spaceY)
  spaceY += 15
  doc.text(`Cidade: ${sale.city}`, 10, spaceY)
  doc.text(`Bairro: ${sale.neighborhood}`, 260, spaceY)
  spaceY += 15
  doc.text(`Endereço: ${sale.address}`, 10, spaceY)
  doc.text(`Complemento: ${sale.complement}`, 260, spaceY)

  if (sale.logistic_infos[0].notes) {
    spaceY += 25

    doc.setFontSize(16)
    doc.text('Anotações:', 10, spaceY)
    spaceY += 15
    doc.setFontSize(14)
    doc.text(sale.logistic_infos[0].notes || 'Nenhuma anotação.', 10, spaceY, { maxWidth: 460 })
  }


  doc.save(`resumo-venda-${formatDocDateTime(sale.created_at)}.pdf`)
}

export const makeSalesCsv = (sales: Sale[], firstProduct: string = '') => {

  if (!sales.length) return

  const headers = {
    number: '#',
    created_at: 'Data da venda',
    client_name: 'Cliente',
    client_phone: 'Telefone',
    client_city: 'Cidade',
    seller: 'Vendedor',
    sales_quantity: 'Vendas',
    total_products: 'Total produtos',
    disconts: 'Desconto',
    total_amount: 'Valor total'
  }

  const totalProductsQuantity = Math.max(...sales.map(sale => sale.sale_products.length))
  const totalPaymentsQuantity = Math.max(...sales.map(sale => sale.sale_payments.length))

  for (let i = 1; i <= totalPaymentsQuantity; i++) {
    headers[`payment_${i}`] = `Forma pagamento ${i}`
    headers[`payment_${i}_amount`] = `Valor pagamento ${i}`
  }

  for (let i = 1; i <= totalProductsQuantity; i++) {
    headers[`product_${i}`] = `Produto ${i}`
    headers[`product_${i}_quantity`] = `Produto ${i} Qntd.`
    headers[`product_${i}_unit_value`] = `Produto ${i} Valor Und.`
  }

  const salesMap = sales.map(({ sale_products, ...sale }) => {

    const total_products = sale_products.reduce((pv, cv) => pv + cv.quantity, 0)
    const total_amount = sale_products.reduce((pv, cv) => pv + (cv.quantity * cv.unit_value), 0) - sale.discounts

    const data = {
      number: sale.number,
      created_at: formatDateTime(sale.created_at),
      client_name: sale.name,
      client_phone: sale.phone ? formatPhone(sale.phone) : '',
      client_city: sale.city,
      seller: sale.user.name,
      sales_quantity: sale.sales_quantity,
      total_products,
      discounts: floatToReal(sale.discounts),
      total_amount: floatToReal(total_amount)
    }

    for (let i = 0; i < totalPaymentsQuantity; i++) {

      const sp = sale.sale_payments[i]

      const creditCardTxt = (sp && sp.id_payment_type === 'credit_card') ? ` em ${sp.card_installments}x` : ''

      data[`payment_${i + 1}`] = sp ? (sp.payment_type.name + creditCardTxt) : ''
      data[`payment_${i + 1}_amount`] = sp ? floatToReal(sp.amount) : ''

    }

    if (firstProduct) {
      const product = sale_products.find(sp => sp.id_product === firstProduct)

      data[`product_1`] = product.product.name
      data[`product_1_quantity`] = product.quantity
      data[`product_1_unit_value`] = floatToReal(product.unit_value)

      const restProducts = sale_products.filter(sp => sp.id_product !== firstProduct)

      for (let i = 0; i < totalProductsQuantity; i++) {

        const sp = restProducts[i]

        data[`product_${i + 2}`] = sp ? sp.product.name : ''
        data[`product_${i + 2}_quantity`] = sp ? sp.quantity : ''
        data[`product_${i + 2}_unit_value`] = sp ? floatToReal(sp.unit_value) : ''
      }
    } else {

      for (let i = 1; i <= totalProductsQuantity; i++) {

        const sp = sale_products[i - 1]

        data[`product_${i}`] = sp ? sp.product.name : ''
        data[`product_${i}_quantity`] = sp ? sp.quantity : ''
        data[`product_${i}_unit_value`] = sp ? floatToReal(sp.unit_value) : ''
      }
    }

    return data
  })

  const csv = jsonToCsv(salesMap, headers)

  const fileName = `vendas_${new Date().getTime()}`

  downloadCsv(csv, fileName)
}
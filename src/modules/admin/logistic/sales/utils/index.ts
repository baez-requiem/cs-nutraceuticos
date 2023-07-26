import { jsPDF } from "jspdf"
import { Sale } from "src/services/api/logistic/logistic.types"
import { formatDate, formatDateTime, formatDocDateTime } from "src/utils/date.utils"
import { floatToReal, formatCEP, formatPhone } from "src/utils/number.utils"

export const mapSaleProductsLogistic = (
  sale_products: Sale['sale_products'] = []
) => sale_products.map(sp => ({
  name: sp.product.name,
  quantity: sp.quantity,
  sales_quantity: sp.sales_quantity,
  unit_value: sp.product.amount,
  total: sp.quantity * sp.product.amount
}))

export const totalSaleValue = (sale: Sale, withDiscount?: boolean) => {
  if (!sale) {
    return 0
  }

  const total = sale.sale_products.reduce((pv, cv) => pv + (cv.quantity * cv.product.amount), 0)

  return withDiscount ? (total - sale.discounts) : total
}

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
  doc.text('Resumo da venda', 10, spaceY)

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

  spaceY += 30

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
  doc.text('Dados da entrega', 10, spaceY)
  
  spaceY += 25
  
  doc.setFontSize(14)
  doc.text(`Tipo de entrega: ${sale.logistic_infos[0].delivery_type.name}`, 10, spaceY)
  if (sale.logistic_infos[0].delivery_type.id === 'motoboy') {
    doc.text(`Motoboy: ${sale.logistic_infos[0].motoboy.name}`, 260, spaceY)
  }

  spaceY += 15

  doc.text(`Forma de pagamento: ${sale.payment_type.name}`, 10, spaceY)
  if (sale.payment_type_id === 'credit_card') {
    doc.text(`N° de parcelas: ${sale.card_installments}`, 260, spaceY)
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

    doc.text('Anotações:', 10, spaceY)
    spaceY += 15
    doc.text(sale.logistic_infos[0].notes || 'Nenhuma anotação.', 10, spaceY)
  }


  doc.save(`resumo-venda-${formatDocDateTime(sale.created_at)}.pdf`)
}
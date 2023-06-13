export function numberFormat(
  number: number | string,
  decimals: number = 0,
  dec_point: string = '.',
  thousands_sep: string = ','
): string {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '')

  const n: number = !isFinite(+number) ? 0 : +number
  const prec: number = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  const sep: string = typeof thousands_sep === 'undefined' ? ',' : thousands_sep
  const dec: string = typeof dec_point === 'undefined' ? '.' : dec_point
  
  let s: string|string[] = ''

  const toFixedFix = function (n: number, prec: number): string {
    const k: number = Math.pow(10, prec);
    return `${Math.round(n * k) / k}`;
  }

  s = (prec ? toFixedFix(n, prec).toString() : `${Math.round(n)}`).split('.')

  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, sep)
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += '0'.repeat(prec - s[1].length)
  }

  return s.join(dec)
}

export function onlyNumbers(str: number|string = 0): string {
  return str.toString().replace(/\D/g, "")
}

export function formatReal(number: number | string): string {
  return numberFormat(parseInt(onlyNumbers(number))/100, 2, ',', '.')
}

export function realToFloat(value: string|number): number {
  const newValue = value
    .toString()
    .replace(/[^\d,-]/g, '')
    .replace(',', '.')
    .replace(/(\d)-/g, '$1')

  return parseFloat(newValue)
}

export function floatToReal(value: number): string {
  return value.toLocaleString('pt-br',{ currency: 'BRL', minimumFractionDigits: 2 })
}

export function formatPhone(number: number | string = ''): string {
  let n = number.toString().replace(/\D/g, "")

  n = n.replace(/^0/, "")

  if (n.length > 10) {
    n = n.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3")
  } else if (n.length > 5) {
    n = n.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3")
  } else if (n.length > 2) {
    n = n.replace(/^(\d\d)(\d{0,5})/, "($1) $2")
  } else {
    n = n.replace(/^(\d*)/, "($1")
  }

  return n
}

export function formatCPF(value: string): string {
  return value
    .replace(/\D/g,"")
    .replace(/(\d{3})(\d)/,"$1.$2")
    .replace(/(\d{3})(\d)/,"$1.$2")
    .replace(/(\d{3})(\d{1,2})$/,"$1-$2")
}
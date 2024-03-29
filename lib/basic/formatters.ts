export function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)
  }
  catch (err) {}
  return `${currency} ${amount.toFixed(2)}`
}

export function formatPercent(value: number): string {
  try {
    return new Intl.NumberFormat(undefined, { style: 'percent' }).format(value)
  }
  catch (err) {}
  return `${(value * 100).toFixed(0)} %`
}

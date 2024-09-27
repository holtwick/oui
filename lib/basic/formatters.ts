export function formatCurrency(amount: number, currency: string, fallback = ''): string {
  try {
    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)
    }
    catch (err) {}
    return `${currency} ${amount.toFixed(2)}`
  }
  catch (err) {
    return fallback
  }
}

export function formatPercent(value: number, fallback = ''): string {
  try {
    try {
      return new Intl.NumberFormat(undefined, { style: 'percent' }).format(value)
    }
    catch (err) {}
    return `${(value * 100).toFixed(0)} %`
  }
  catch (err) {
    return fallback
  }
}

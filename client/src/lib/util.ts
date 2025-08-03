export function currencyFormat(amount: number) {
  return '$' + (amount / 100).toFixed(2);
}

export function currencyWithoutFormat(currencyString: string): number {
  return parseFloat(currencyString.replace(/[^0-9.]/g, ''));
}


export function filterEmptyValues(values: object) {
  return Object.fromEntries(
    Object.entries(values).filter(
      ([, value]) => value !== '' && value != null && value !== undefined && value.length !== 0
    )
  )
}
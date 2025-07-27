export function currencyFormat(amount: number) {
    return '$' + (amount / 100).toFixed(2);
}

export function currencyWithoutFormat(currencyString: string): number {
  return parseFloat(currencyString.replace(/[^0-9.]/g, ''));
}

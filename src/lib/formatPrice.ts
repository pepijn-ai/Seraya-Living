export function formatAED(amount: number): string {
  return new Intl.NumberFormat("en-AE").format(amount);
}

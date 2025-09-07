import type { PaymentSummary, ShippingAddress } from "../app/models/order";

export function currencyFormat(amount: number) {
  return "$" + (amount / 100).toFixed(2);
}

export function currencyWithoutFormat(currencyString: string): number {
  return parseFloat(currencyString.replace(/[^0-9.]/g, ""));
}

export function filterEmptyValues(values: object) {
  return Object.fromEntries(
    Object.entries(values).filter(
      ([, value]) =>
        value !== "" &&
        value != null &&
        value !== undefined &&
        value.length !== 0
    )
  );
}

export function formatAddresString(address: ShippingAddress) {

  return `${address.name}, ${address?.line1}, ${address?.line2 ? address.line2 + ", " : ""
    }${address?.city},
        ${address?.state ? address.state + ", " : ""}${address?.postal_code}, ${address?.country
    }`;
}

export function formatPaymentString(card: PaymentSummary) {

  return `${card?.brand?.toUpperCase()} ending in ${card?.last4}, expires ${card?.exp_month
    }/${card?.exp_year}`;
};

export interface Order{
    id: number;
    buyerEmail: string;
    orderDate: string;
    shippingAddress: ShippingAddress;
    deliveryFee: number;
    subtotal: number;
    total: number;
    discount: number;
    orderStatus: string;
    orderItems: OrderItem[];
    paymentSummary: PaymentSummary;
}

export interface ShippingAddress{
    name: string;
    line1: string;
    line2?: string | null;
    city: string;
    state: string;
    postal_code: string;
    country: string;
}

export interface OrderItem{
    productId: number;
    name: string;
    pictureUrl: string;
    price: number;
    quantity: number;
}

export interface PaymentSummary{
    last4: number | string;
    brand: string;
    exp_month: number;
    exp_year: number;
}

export interface CreateOrder{
    shippingAddress: ShippingAddress;
    paymentSummary: PaymentSummary;
}
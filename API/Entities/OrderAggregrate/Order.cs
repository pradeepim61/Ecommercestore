using System;

namespace API.Entities.OrderAggregrate;

public class Order
{
    public int Id { get; set; }
    public required string BuyerEmail { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public required ShippingAddress ShippingAddress { get; set; }
    public List<OrderItem> OrderItems { get; set; } = [];
    public long Subtotal { get; set; }
    public long DeliveryFee { get; set; }
    public long Discount { get; set; }
    public required string PaymentIntentId { get; set; }
    public PaymentSummary? PaymentSummary { get; set; }
    public OrderStatus Status { get; set; } = OrderStatus.Pending;

    public long GetTotal()
    {
        return Subtotal + DeliveryFee - Discount;
    }

    public static implicit operator Task<object>(Order v)
    {
        throw new NotImplementedException();
    }
}

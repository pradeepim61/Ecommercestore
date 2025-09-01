using System;

namespace API.Entities.OrderAggregrate;

public class OrderItem
{
    public int Id { get; set; }
    public ProductItemOrdered ItemOrdered { get; set; } = null!;
    public long Price { get; set; }
    public int Quantity { get; set; }
}

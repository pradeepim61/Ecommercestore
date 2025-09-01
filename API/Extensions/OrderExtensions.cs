using API.DTOs;
using API.Entities.OrderAggregrate;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class OrderExtensions
{
    public static IQueryable<OrderDto> ProjectOrderToOrderDto(this IQueryable<Order> query) =>
        query.Select(order => new OrderDto
        {
            Id = order.Id,
            BuyerEmail = order.BuyerEmail,
            OrderDate = order.OrderDate,
            ShippingAddress = order.ShippingAddress,
            OrderItems = order.OrderItems.Select(item => new OrderItemDto
            {
                ProductId = item.ItemOrdered.ProductId,
                Name = item.ItemOrdered.Name,
                PictureUrl = item.ItemOrdered.PictureUrl,
                Price = item.Price,
                Quantity = item.Quantity
            }).ToList(),
            Subtotal = order.Subtotal,
            DeliveryFee = order.DeliveryFee,
            Discount = order.Discount,
            Total = order.GetTotal(),
            PaymentSummary = order.PaymentSummary,
            OrderStatus = order.Status.ToString()
        }).AsNoTracking();

        public static OrderDto ToDto(this Order order) =>
            new()
            {
                Id = order.Id,
                BuyerEmail = order.BuyerEmail,
                OrderDate = order.OrderDate,
                ShippingAddress = order.ShippingAddress,
                OrderItems = [.. order.OrderItems.Select(item => new OrderItemDto
                {
                    ProductId = item.ItemOrdered.ProductId,
                    Name = item.ItemOrdered.Name,
                    PictureUrl = item.ItemOrdered.PictureUrl,
                    Price = item.Price,
                    Quantity = item.Quantity
                })],
                Subtotal = order.Subtotal,
                DeliveryFee = order.DeliveryFee,
                Discount = order.Discount,
                Total = order.GetTotal(),
                PaymentSummary = order.PaymentSummary,
                OrderStatus = order.Status.ToString()
            };
}

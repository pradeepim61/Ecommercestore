using System.Linq;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregrate;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class OrdersController(StoreContext context) : BaseApiController
    {
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            var orders = await context.Orders
                .ProjectOrderToOrderDto()
                .Where(o => o.BuyerEmail == User.GetUserName())
                .ToListAsync();

            return orders;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            var order = await context.Orders
                .ProjectOrderToOrderDto()
                .FirstOrDefaultAsync(o => o.Id == id && o.BuyerEmail == User.GetUserName());

            if (order == null) return NotFound();

            return order;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
        {
            var basket = await context.Baskets
                .GetBasketWithItems(Request.Cookies["basketId"]);

            if (basket == null || basket.Items.Count == 0 || string.IsNullOrEmpty(basket.PaymentIntentId)) return BadRequest(new ProblemDetails { Title = "Could not find basket" });

            var items = CreateOrderItems(basket.Items);
            if (items == null) return BadRequest(new ProblemDetails { Title = "One or more products in your basket do not have sufficient stock" });
            
            var subtotal = items.Sum(item => item.Price * item.Quantity);
            var deliveryFee = CalculateDeliveryFee(subtotal);

            var order = await context.Orders
                    .Include(x => x.OrderItems)
                    .FirstOrDefaultAsync(x => x.PaymentIntentId == basket.PaymentIntentId);

            if (order == null)
            {
                order = new Order
                {
                    BuyerEmail = User.GetUserName() ?? string.Empty,
                    OrderItems = items,
                    ShippingAddress = orderDto.ShippingAddress,
                    DeliveryFee = deliveryFee,
                    PaymentSummary = orderDto.PaymentSummary,
                    PaymentIntentId = basket.PaymentIntentId,
                    Subtotal = subtotal
                };
                context.Orders.Add(order);
            }
            else
            {
                order.OrderItems = items;
            }

            //context.Baskets.Remove(basket);
            //Response.Cookies.Delete("basketId");

            var result = await context.SaveChangesAsync() > 0;

            if (!result) return BadRequest(new ProblemDetails { Title = "Problem creating order" });

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order.ToDto());
        }

        private static long CalculateDeliveryFee(long subtotal)
        {
            return subtotal > 10000 ? 0 : 500;
        }

        private static List<OrderItem>? CreateOrderItems(List<BasketItem> items)
        {
            var orderItems = new List<OrderItem>();

            foreach (var item in items)
            {
                if (item.Product.QuantityStock < item.Quantity)
                    return null;

                var itemOrdered = new ProductItemOrdered
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    PictureUrl = item.Product.PictureUrl
                };

                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Price = item.Product.Price,
                    Quantity = item.Quantity
                };

                orderItems.Add(orderItem);

                item.Product.QuantityStock -= item.Quantity;
            }

            return orderItems;
        }

    }
}
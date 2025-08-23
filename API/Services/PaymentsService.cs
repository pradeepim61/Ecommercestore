using System;
using API.Entities;
using Stripe;

namespace API.Services;

public class PaymentsService(IConfiguration config)
{
    public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
    {
        StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];

        var service = new PaymentIntentService();

        var intent = new PaymentIntent();
        var subtotal = basket.Items.Sum(item => item.Product.Price * item.Quantity);
        var deliveryFee = subtotal > 10000 ? 0 : 500;

        if (string.IsNullOrEmpty(basket.PaymentIntentId))
        {
            // Create a new PaymentIntent
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)(subtotal + deliveryFee), // Convert to cents
                Currency = "usd",
                PaymentMethodTypes = ["card"],
            };

            intent = await service.CreateAsync(options);
            //basket.PaymentIntentId = intent.Id;
        }
        else
        {
            // Update the existing PaymentIntent
            var options = new PaymentIntentUpdateOptions
            {
                Amount = (long)(subtotal + deliveryFee), // Convert to cents
            };

            intent = await service.UpdateAsync(basket.PaymentIntentId, options);
        }
        //basket.ClientSecret = intent.ClientSecret;

        return intent;
    }
}

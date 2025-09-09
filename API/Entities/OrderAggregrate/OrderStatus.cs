using System;

namespace API.Entities.OrderAggregrate;

public enum OrderStatus
{
    Pending,
    PaymentReceived,
    PaymentFailed,
    PaymentMismatch
}

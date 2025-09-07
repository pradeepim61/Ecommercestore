import { Box, Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import type { Order } from "../../app/models/order";
import { currencyFormat, formatAddresString, formatPaymentString } from "../../lib/util";

export default function CheckoutSuccess() {
    const { state } = useLocation();
    const order = state.data as Order;
    
    if (!order) return <Typography variant="h5">Problem accessing the order</Typography>
    //console.log("API Response:", JSON.stringify(order, null, 2));
    // const addressstring = () => {
    //     const address = order.shippingAddress;

    //     return `${address.name}, ${address?.line1}, ${address?.line2 ? address.line2 + ', ' : ''}${address?.city},
    //     ${address?.state ? address.state + ', ' : ''}${address?.postal_code}, ${address?.country}`;
    // }

    // const paymentString = () => {
    //     const card = order.PaymentSummary;
    //     return `${card?.brand?.toUpperCase()} ending in ${card?.last4}, expires ${card?.exp_month}/${card?.exp_year}`;
    // }
    
     //console.log(Object.values(order.PaymentSummary).concat('-'));
    return (
        <Container maxWidth="md">
            <>
                <Typography variant="h4" gutterBottom fontWeight='bold'>
                    Thank you for your order
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>Order number: {order.id}</Typography>

                <Paper sx={{ p: 2, mb: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant="body2" color="textSecondary">
                            Order Date
                        </Typography>
                        <Typography variant="body2" fontWeight='bold'>
                            {order.orderDate}
                        </Typography>
                    </Box>
                    <Divider></Divider>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant="body2" color="textSecondary">
                            Payment method
                        </Typography>
                        <Typography variant="body2" fontWeight='bold'>
                            {formatPaymentString(order.paymentSummary)}
                        </Typography>
                    </Box>
                    <Divider></Divider>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant="body2" color="textSecondary">
                            Shipping Address
                        </Typography>
                        <Typography variant="body2" fontWeight='bold'>
                            {formatAddresString(order.shippingAddress)}
                        </Typography>
                    </Box>
                    <Divider></Divider>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant="body2" color="textSecondary">
                            Amount
                        </Typography>
                        <Typography variant="body2" fontWeight='bold'>
                            {currencyFormat(order.total)}
                        </Typography>
                    </Box>
                </Paper>

                <Box display='flex' justifyContent='flex-start' gap={2}>
                    <Button variant="contained" color="primary" component={Link} to={`/orders/${order.id}`}>View Your order</Button>
                    <Button variant="outlined" color="primary" component={Link} to='/catalog'>Continue shopping</Button>
                </Box>
            </>
        </Container>
    )
}
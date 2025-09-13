import { Box, Button, Container, Divider, Paper, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import type { Order } from "../../app/models/order";
import { currencyFormat, formatAddresString, formatPaymentString } from "../../lib/util";

export default function CheckoutSuccess() {
    const { state } = useLocation();
    const order = state.data as Order;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    
    if (!order) return <Typography variant="h5">Problem accessing the order</Typography>

    return (
        <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
            <>
                <Typography 
                    variant={isMobile ? "h5" : isTablet ? "h4" : "h3"} 
                    gutterBottom 
                    fontWeight='bold'
                    textAlign={{ xs: 'center', sm: 'left' }}
                >
                    Thank you for your order
                </Typography>
                
                <Typography 
                    variant="body1" 
                    color="textSecondary" 
                    gutterBottom 
                    textAlign={{ xs: 'center', sm: 'left' }}
                >
                    Order number: {order.id}
                </Typography>

                <Paper sx={{ 
                    p: { xs: 1.5, sm: 2 }, 
                    mb: 2, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 1.5 
                }}>
                    <Box display='flex' justifyContent='space-between' flexDirection={{ xs: 'column', sm: 'row' }} gap={1}>
                        <Typography variant="body2" color="textSecondary" sx={{ minWidth: { sm: '120px' } }}>
                            Order Date
                        </Typography>
                        <Typography variant="body2" fontWeight='bold' textAlign={{ xs: 'center', sm: 'right' }}>
                            {order.orderDate}
                        </Typography>
                    </Box>
                    
                    <Divider />
                    
                    <Box display='flex' justifyContent='space-between' flexDirection={{ xs: 'column', sm: 'row' }} gap={1}>
                        <Typography variant="body2" color="textSecondary" sx={{ minWidth: { sm: '120px' } }}>
                            Payment method
                        </Typography>
                        <Typography variant="body2" fontWeight='bold' textAlign={{ xs: 'center', sm: 'right' }}>
                            {formatPaymentString(order.paymentSummary)}
                        </Typography>
                    </Box>
                    
                    <Divider />
                    
                    <Box display='flex' justifyContent='space-between' flexDirection={{ xs: 'column', sm: 'row' }} gap={1}>
                        <Typography variant="body2" color="textSecondary" sx={{ minWidth: { sm: '120px' } }}>
                            Shipping Address
                        </Typography>
                        <Typography 
                            variant="body2" 
                            fontWeight='bold' 
                            textAlign={{ xs: 'center', sm: 'right' }}
                            sx={{ wordBreak: 'break-word' }}
                        >
                            {formatAddresString(order.shippingAddress)}
                        </Typography>
                    </Box>
                    
                    <Divider />
                    
                    <Box display='flex' justifyContent='space-between' flexDirection={{ xs: 'column', sm: 'row' }} gap={1}>
                        <Typography variant="body2" color="textSecondary" sx={{ minWidth: { sm: '120px' } }}>
                            Amount
                        </Typography>
                        <Typography variant="body2" fontWeight='bold' textAlign={{ xs: 'center', sm: 'right' }}>
                            {currencyFormat(order.total)}
                        </Typography>
                    </Box>
                </Paper>

                <Box 
                    display='flex' 
                    justifyContent={{ xs: 'center', sm: 'flex-start' }} 
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    gap={2}
                    alignItems="center"
                >
                    <Button 
                        variant="contained" 
                        color="primary" 
                        component={Link} 
                        to={`/orders/${order.id}`}
                        size={isMobile ? "medium" : "large"}
                        fullWidth={isMobile}
                    >
                        View Your Order
                    </Button>
                    
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        component={Link} 
                        to='/catalog'
                        size={isMobile ? "medium" : "large"}
                        fullWidth={isMobile}
                    >
                        Continue Shopping
                    </Button>
                </Box>
            </>
        </Container>
    )
}
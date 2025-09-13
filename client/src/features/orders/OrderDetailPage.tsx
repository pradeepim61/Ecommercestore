import { Link, useParams } from "react-router-dom"
import { useFetchOrderDetailQuery } from "./orderApi";
import { 
    Box, 
    Button, 
    Card, 
    Divider, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableRow, 
    Typography, 
    useTheme, 
    useMediaQuery,
    Chip,
    Grid2
} from "@mui/material";
import { format } from "date-fns";
import { currencyFormat, formatAddresString, formatPaymentString } from "../../lib/util";

export default function OrderDetailPage() {
    const { id } = useParams();
    const { data: order, isLoading } = useFetchOrderDetailQuery(+id!);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    //const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    if (isLoading) return <Typography variant="h5" align="center">Loading order...</Typography>
    if (!order) return <Typography variant="h5" align="center">Order not found</Typography>

    return (
        <Card sx={{ 
            p: { xs: 1.5, sm: 2, md: 3 }, 
            maxWidth: 'md', 
            mx: 'auto',
            borderRadius: 3
        }}>
            {/* Header Section */}
            <Box display='flex' justifyContent='space-between' alignItems='center' flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                <Typography variant={isMobile ? "h6" : "h5"} fontWeight='bold' textAlign={{ xs: 'center', sm: 'left' }}>
                    Order #{order.id}
                </Typography>
                <Button 
                    component={Link} 
                    to='/orders' 
                    variant="outlined" 
                    size={isMobile ? "small" : "medium"}
                    fullWidth={isMobile}
                >
                    Back to orders
                </Button>
            </Box>
            
            <Divider sx={{ my: 2 }} />

            {/* Billing and Delivery Information */}
            <Box>
                <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight='bold' gutterBottom>
                    Billing and Delivery Information
                </Typography>
                
                <Grid2 container spacing={2}>
                    <Grid2 sx={{ xs:12, md:6}}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" fontWeight='500' color="textSecondary">
                                Shipping Address
                            </Typography>
                            <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                                {formatAddresString(order.shippingAddress)}
                            </Typography>
                        </Box>
                    </Grid2>
                    
                    <Grid2 sx={{ xs:12, md:6}}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" fontWeight='500' color="textSecondary">
                                Payment Info
                            </Typography>
                            <Typography variant="body2">
                                {formatPaymentString(order.paymentSummary)}
                            </Typography>
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Order Details */}
            <Box>
                <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight='bold' gutterBottom>
                    Order Details
                </Typography>
                
                <Grid2 container spacing={2}>
                    <Grid2 sx={{xs:12, sm:6, md:4 }}>
                        <Box>
                            <Typography variant="subtitle2" fontWeight='500' color="textSecondary">
                                Email Address
                            </Typography>
                            <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                                {order.buyerEmail}
                            </Typography>
                        </Box>
                    </Grid2>
                    
                    <Grid2 sx={{xs:12, sm:6, md:4 }}>
                        <Box>
                            <Typography variant="subtitle2" fontWeight='500' color="textSecondary">
                                Order Status
                            </Typography>
                            <Chip 
                                label={order.orderStatus} 
                                size="small" 
                                color={
                                    order.orderStatus.toLowerCase().includes('paymentreceived') ? 'success' :
                                    order.orderStatus.toLowerCase().includes('pending') ? 'warning' :
                                    order.orderStatus.toLowerCase().includes('cancel') ? 'error' : 'default'
                                }
                            />
                        </Box>
                    </Grid2>
                    
                    <Grid2 sx={{xs:12, sm:6, md:4 }}>
                        <Box>
                            <Typography variant="subtitle2" fontWeight='500' color="textSecondary">
                                Order Date
                            </Typography>
                            <Typography variant="body2">
                                {format(order.orderDate, 'dd MMM yyyy')}
                            </Typography>
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Order Items */}
            <Box>
                <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight='bold' gutterBottom>
                    Order Items
                </Typography>
                
                {isMobile ? (
                    // Mobile view - Card layout for items
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {order.orderItems.map((item) => (
                            <Card key={item.productId} sx={{ p: 2, borderRadius: 2 }}>
                                <Box display="flex" alignItems="center" gap={2} mb={1}>
                                    <img 
                                        src={item.pictureUrl} 
                                        alt={item.name} 
                                        style={{ 
                                            height: 50, 
                                            width: 50, 
                                            objectFit: 'cover',
                                            borderRadius: 4 
                                        }} 
                                    />
                                    <Box flex={1}>
                                        <Typography variant="subtitle2" fontWeight="500">
                                            {item.name}
                                        </Typography>
                                    </Box>
                                </Box>
                                
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="body2" color="textSecondary">
                                        Qty: {item.quantity}
                                    </Typography>
                                    <Typography variant="body1" fontWeight="bold">
                                        {currencyFormat(item.price * item.quantity)}
                                    </Typography>
                                </Box>
                                
                                <Typography variant="body2" color="textSecondary" textAlign="right">
                                    {currencyFormat(item.price)} each
                                </Typography>
                            </Card>
                        ))}
                    </Box>
                ) : (
                    // Tablet/Desktop view - Table layout
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {order.orderItems.map((item) => (
                                    <TableRow key={item.productId}>
                                        <TableCell sx={{ py: 2 }}>
                                            <Box display='flex' alignItems='center' gap={2}>
                                                <img 
                                                    src={item.pictureUrl} 
                                                    alt={item.name} 
                                                    style={{ 
                                                        height: 50, 
                                                        width: 50, 
                                                        objectFit: 'cover',
                                                        borderRadius: 4 
                                                    }} 
                                                />
                                                <Typography variant="body1">{item.name}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align='center' sx={{ py: 2 }}>
                                            x {item.quantity}
                                        </TableCell>
                                        <TableCell align='right' sx={{ py: 2, fontWeight: 'bold' }}>
                                            {currencyFormat(item.price * item.quantity)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Order Summary */}
            <Box>
                <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight='bold' gutterBottom>
                    Order Summary
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant="body2" color="textSecondary">
                            Sub Total
                        </Typography>
                        <Typography variant="body2">
                            {currencyFormat(order.subtotal)}
                        </Typography>
                    </Box>
                    
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant="body2" color="textSecondary">
                            Discount
                        </Typography>
                        <Typography variant="body2" color="success.main">
                            -{currencyFormat(order.discount)}
                        </Typography>
                    </Box>
                    
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant="body2" color="textSecondary">
                            Delivery Fee
                        </Typography>
                        <Typography variant="body2">
                            {currencyFormat(order.deliveryFee)}
                        </Typography>
                    </Box>
                    
                    <Divider sx={{ my: 1 }} />
                    
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant="body1" fontWeight="bold">
                            Total
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" color="primary">
                            {currencyFormat(order.total)}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Card>
    )
}
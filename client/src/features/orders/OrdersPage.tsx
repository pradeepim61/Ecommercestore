import { 
    Container, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableRow, 
    Typography, 
    Box,
    useTheme,
    useMediaQuery,
    Chip
} from "@mui/material";
import { useFetchOrdersQuery } from "./orderApi"
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { currencyFormat } from "../../lib/util";

export default function OrdersPage() {
    const { data: orders, isLoading } = useFetchOrdersQuery();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    if (isLoading) return <Typography variant="h6" align="center">Loading orders...</Typography>
    
    if (!orders || orders.length === 0) return (
        <Container maxWidth="md">
            <Typography variant="h5" align="center" gutterBottom>
                My Orders
            </Typography>
            <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3 }}>
                <Typography variant="body1" color="textSecondary">
                    No orders found
                </Typography>
            </Paper>
        </Container>
    )

    return (
        <Container maxWidth="md" sx={{ px: { xs: 1, sm: 2 } }}>
            <Typography 
                variant={isMobile ? "h6" : "h5"} 
                align="center" 
                gutterBottom 
                sx={{ mb: 3 }}
            >
                My Orders
            </Typography>
            
            {isMobile ? (
                // Mobile view - Card layout
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {orders.map(order => (
                        <Paper 
                            key={order.id} 
                            sx={{ 
                                p: 2, 
                                borderRadius: 3,
                                cursor: 'pointer',
                                '&:hover': {
                                    boxShadow: 4,
                                    backgroundColor: 'action.hover'
                                }
                            }}
                            onClick={() => navigate(`/orders/${order.id}`)}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                <Typography variant="subtitle2" fontWeight="bold">
                                    Order #{order.id}
                                </Typography>
                                <Chip 
                                    label={order.orderStatus} 
                                    size="small" 
                                    color={
                                        order.orderStatus.toLowerCase().includes('complete') ? 'success' :
                                        order.orderStatus.toLowerCase().includes('pending') ? 'warning' :
                                        order.orderStatus.toLowerCase().includes('cancel') ? 'error' : 'default'
                                    }
                                />
                            </Box>
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Date:
                                </Typography>
                                <Typography variant="body2">
                                    {format(order.orderDate, 'dd MMM yyyy')}
                                </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="textSecondary">
                                    Total:
                                </Typography>
                                <Typography variant="body2" fontWeight="bold">
                                    {currencyFormat(order.total)}
                                </Typography>
                            </Box>
                        </Paper>
                    ))}
                </Box>
            ) : (
                // Tablet/Desktop view - Table layout
                <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <Table sx={{ minWidth: isTablet ? 400 : 600 }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'grey.100' }}>
                                <TableCell align="center" sx={{ fontWeight: 'bold', py: 2 }}>Order</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Total</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map(order => (
                                <TableRow 
                                    key={order.id} 
                                    hover 
                                    onClick={() => navigate(`/orders/${order.id}`)} 
                                    sx={{ 
                                        cursor: 'pointer',
                                        '&:last-child td': { borderBottom: 0 }
                                    }}
                                >
                                    <TableCell align="center" sx={{ py: 2 }}># {order.id}</TableCell>
                                    <TableCell sx={{ py: 2 }}>{format(order.orderDate, 'dd MMM yyyy')}</TableCell>
                                    <TableCell sx={{ py: 2, fontWeight: 'bold' }}>{currencyFormat(order.total)}</TableCell>
                                    <TableCell sx={{ py: 2 }}>
                                        <Chip 
                                            label={order.orderStatus} 
                                            size="small" 
                                            color={
                                                order.orderStatus.toLowerCase().includes('paymentreceived') ? 'success' :
                                                order.orderStatus.toLowerCase().includes('pending') ? 'warning' :
                                                order.orderStatus.toLowerCase().includes('cancel') ? 'error' : 'default'
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </Container>
    )
}
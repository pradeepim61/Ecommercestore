import { Box, Typography, Divider, Button, TextField, Paper, useTheme, useMediaQuery } from "@mui/material";
import { currencyFormat } from "../../../lib/util";
import { Link, useLocation } from "react-router-dom";
import { useBasket } from "../../../lib/hooks/useBasket";

export default function OrderSummary() {
    const location = useLocation();
    const { subtotal, deliveryFee } = useBasket();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    //const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            maxWidth="lg" 
            mx="auto"
            gap={2}
        >
            <Paper sx={{ 
                mb: { xs: 1, sm: 2 }, 
                p: { xs: 2, sm: 3 }, 
                width: '100%', 
                borderRadius: 3 
            }}>
                <Typography variant={isMobile ? "subtitle1" : "h6"} component="p" fontWeight="bold" gutterBottom>
                    Order summary
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 2 }}>
                    Orders over $100 qualify for free delivery!
                </Typography>
                
                <Box mt={2}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant={isMobile ? "body2" : "body1"} color="textSecondary">
                            Subtotal
                        </Typography>
                        <Typography variant={isMobile ? "body2" : "body1"} fontWeight={isMobile ? "normal" : "bold"}>
                            {currencyFormat(subtotal)}
                        </Typography>
                    </Box>
                    
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant={isMobile ? "body2" : "body1"} color="textSecondary">
                            Discount
                        </Typography>
                        <Typography variant={isMobile ? "body2" : "body1"} color="success.main">
                            -$0.00
                        </Typography>
                    </Box>
                    
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant={isMobile ? "body2" : "body1"} color="textSecondary">
                            Delivery fee
                        </Typography>
                        <Typography variant={isMobile ? "body2" : "body1"} fontWeight={isMobile ? "normal" : "bold"}>
                            {currencyFormat(deliveryFee)}
                        </Typography>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant={isMobile ? "body1" : "h6"} color="textSecondary" fontWeight="bold">
                            Total
                        </Typography>
                        <Typography variant={isMobile ? "body1" : "h6"} fontWeight="bold">
                            {currencyFormat(subtotal + deliveryFee)}
                        </Typography>
                    </Box>
                </Box>

                <Box mt={3}>
                    {!location.pathname.includes("checkout") && 
                    <Button
                        component={Link}
                        to="/checkout"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size={isMobile ? "medium" : "large"}
                        sx={{ 
                            mb: 1,
                            py: { xs: 1, sm: 1.5 }
                        }}
                    >
                        Checkout
                    </Button>}
                    
                    <Button
                        component={Link}
                        to="/catalog"
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "medium" : "large"}
                        sx={{
                            py: { xs: 1, sm: 1.5 }
                        }}
                    >
                        Continue Shopping
                    </Button>
                </Box>
            </Paper>

            {/* Coupon Code Section */}
            <Paper sx={{ 
                width: '100%', 
                borderRadius: 3, 
                p: { xs: 2, sm: 3 } 
            }}>
                <form>
                    <Typography 
                        variant={isMobile ? "body1" : "subtitle1"} 
                        component="label" 
                        fontWeight="bold"
                        gutterBottom
                    >
                        Do you have a voucher code?
                    </Typography>

                    <TextField
                        label="Voucher code"
                        variant="outlined"
                        fullWidth
                        size={isMobile ? "small" : "medium"}
                        sx={{ 
                            my: 2,
                            '& .MuiInputBase-root': {
                                height: isMobile ? 40 : 48
                            }
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size={isMobile ? "medium" : "large"}
                        sx={{
                            py: { xs: 1, sm: 1.5 }
                        }}
                    >
                        Apply code
                    </Button>
                </form>
            </Paper>
        </Box>
    )
}
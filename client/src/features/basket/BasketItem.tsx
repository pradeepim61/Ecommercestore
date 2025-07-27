import { Box, IconButton, Paper, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Item } from "../../app/models/basket";
import { Add, Close, Remove } from "@mui/icons-material";
import { useAddBasketItemMutation, useRemoveBasketItemMutation } from "./basketApi";

type Props = {
    item: Item;
};

export default function BasketItem({ item }: Props) {
    const [addBasketItem] = useAddBasketItemMutation();
    const [removeBasketItem] = useRemoveBasketItemMutation();
    // Use MUI's useTheme and useMediaQuery to handle responsive design
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Paper sx={{ 
            height: isSmallScreen ? 'auto' : 140,
            borderRadius: 3,
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            p: isSmallScreen ? 2 : 0,
            position: 'relative'
        }}>
            {/* Close button - positioned absolutely on small screens */}
            <IconButton 
                onClick={() => removeBasketItem({productId: item.productId, quantity: item.quantity})}
                color="error" 
                size="small" 
                sx={{
                    position: isSmallScreen ? 'absolute' : 'static',
                    top: 8,
                    right: 8,
                    border: 1,
                    borderRadius: 1,
                    minWidth: 0,
                    alignSelf: 'start',
                    mr: isSmallScreen ? 0 : 2,
                    mt: isSmallScreen ? 0 : 2
                }}
            >
                <Close/>
            </IconButton>

            <Box 
                display='flex' 
                flexDirection={isSmallScreen ? 'column' : 'row'} 
                alignItems='center'
                width='100%'
                p={isSmallScreen ? 0 : 2}
            >
                <Box 
                    component='img' 
                    src={item.pictureUrl} 
                    alt={item.name} 
                    sx={{ 
                        width: isSmallScreen ? '100%' : 100, 
                        height: isSmallScreen ? 150 : 100, 
                        objectFit: 'cover', 
                        borderRadius: '4px', 
                        mr: isSmallScreen ? 0 : 4,
                        mb: isSmallScreen ? 2 : 0
                    }} 
                />

                <Box 
                    display='flex' 
                    flexDirection='column' 
                    gap={1} 
                    width={isSmallScreen ? '100%' : 'auto'}
                    px={isSmallScreen ? 2 : 0}
                >
                    <Typography variant="h6" textAlign={isSmallScreen ? 'center' : 'left'}>
                        {item.name}
                    </Typography>
                    
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Typography sx={{ fontSize: '1.1rem' }}>
                            ${(item.price / 100).toFixed(2)} x {item.quantity}
                        </Typography>
                        <Typography sx={{ fontSize: '1.1rem' }} color='primary'>
                            ${((item.quantity * item.price) / 100).toFixed(2)}
                        </Typography>
                    </Box>

                    <Box display='flex' justifyContent='center' alignItems='center' gap={2} mt={1}>
                        <IconButton 
                            onClick={() => removeBasketItem({productId: item.productId, quantity: 1})} 
                            color="error" 
                            size={isSmallScreen ? 'medium' : 'small'} 
                            sx={{ border: 1, borderRadius: 1, minWidth: 0 }}
                        >
                            <Remove/>
                        </IconButton>
                        <Typography variant="h6">{item.quantity}</Typography>
                        <IconButton 
                            onClick={() => addBasketItem({product: item, quantity: 1})} 
                            color="success" 
                            size={isSmallScreen ? 'medium' : 'small'} 
                            sx={{ border: 1, borderRadius: 1, minWidth: 0 }}
                        >
                            <Add/>
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}
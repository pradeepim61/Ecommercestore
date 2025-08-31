import { Box, Divider, Typography, TableContainer, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { currencyFormat } from "../../lib/util";
import type { ConfirmationToken } from "@stripe/stripe-js";
import { useBasket } from "../../lib/hooks/useBasket";

type props = {
    confirmationToken: ConfirmationToken | null;
}

export default function Review({ confirmationToken }: props) {
    const { basket } = useBasket();

    const addressString = () => {
        if (!confirmationToken?.shipping) return '';
        const { address, name } = confirmationToken.shipping;

        return `${name}, ${address?.line1}, ${address?.line2 ? address.line2 + ', ' : ''}${address?.city},
        ${address?.state ? address.state + ', ' : ''}${address?.postal_code}, ${address?.country}`;
    }

    const paymentString = () => {
        if (!confirmationToken?.payment_method_preview.card) return '';
        const { card } = confirmationToken.payment_method_preview;

        return `${card.brand.toUpperCase()} ending in ${card.last4}, expires ${card.exp_month}/${card.exp_year}`;
    }

    return (
        <div>
            <Box mt={4} width={'100%'}>
                <Typography variant="h6" gutterBottom>
                    Billing and delivery details will go here
                </Typography>
                <dl>
                    <Typography component='dt' fontWeight='medium'>Shipping Address</Typography>
                    <Typography component='dd' mt={1} color="textSecondary">{addressString()}</Typography>

                    <Typography component='dt' fontWeight='medium'>Payment details</Typography>
                    <Typography component='dd' mt={1} color="textSecondary">{paymentString()}</Typography>
                </dl>
            </Box>

            <Box mt={6} mx='auto'>
                <Divider></Divider>
                <TableContainer>
                    <Table>
                        <TableBody>
                            {basket?.items.map((item) => (
                                <TableRow key={item.productId} sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                                    <TableCell sx={{ py: '4' }}>
                                        <Box display='flex' alignItems='center'>
                                            <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                            <Typography>{item.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align='center' sx={{ p: 4 }}>
                                        x {item.quantity}
                                    </TableCell>
                                    <TableCell align='right' sx={{ p: 4 }}>
                                        x {currencyFormat(item.price)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )
}
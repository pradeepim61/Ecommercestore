import { Grid2 } from "@mui/material";
import { useFetchBasketQuery } from "./basketApi";
import BasketItem from "./BasketItem";
import OrderSummary from "../../app/shared/components/orderSummary";

export default function BasketPage() {
    const { data, isLoading } = useFetchBasketQuery();

    if (isLoading) return <div>Loading...</div>;

    if (!data) return <div>No items in the basket</div>;

    return (

    <Grid2 container spacing={2}>
        <Grid2 size={{xs: 12, md: 8}}>
            {data.items.map(item => (
            <BasketItem item={item} key={item.productId}></BasketItem>
            ))}
        </Grid2>
        <Grid2 size={{xs: 12, md: 4}}>
            <OrderSummary />
        </Grid2>
    </Grid2>
    )
}
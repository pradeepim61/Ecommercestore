import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import type { Product } from "../../app/models/product"
import { Link } from "react-router-dom"
import { useAddBasketItemMutation } from "../basket/basketApi"
import { currencyFormat } from "../../lib/util"

type props = {
    product: Product
}

export default function ProductCard({ product }: props) {

    const [addBasketItem, {isLoading}] = useAddBasketItemMutation();

    return (
        <Card elevation={3} sx={{ width: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardMedia
                sx={{ height: 240, backgroundSize: 'cover' }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom sx={{ textTransform: 'uppercase' }} variant="subtitle2">{product.name}</Typography>
                <Typography variant="h6" sx={{ color: 'secondary.main' }}>{currencyFormat(product.price)}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button disabled={isLoading} onClick={() => addBasketItem({product: product, quantity: 1})} variant="contained" >Add to Cart</Button>
                <Button component={Link} to={`/catalog/${product.id}`} >View</Button>
            </CardActions>
        </Card>
    )
}
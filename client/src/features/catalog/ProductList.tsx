import { Grid2, useMediaQuery, useTheme } from "@mui/material"
import type { Product } from "../../app/models/product"
import ProductCard from "./ProductCard"

type props = {
    products: Product[]
}

export default function ProductList({ products }: props) {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only('xs'));

    return (
        <Grid2 container spacing={3}>
            {products.map(product => (
                <Grid2 size={{ xs: 6, sm: 4, md: 3 }} sx={{
                    display: 'flex',
                    '& .MuiPaper-root': { // Target Card component
                        height: isXs ? 240 : 'auto', // Only reduce on xs
                        minHeight: 320, // Default minimum height
                        '& .MuiCardMedia-root': { // Target image
                            height: isXs ? 100 : 150, // Only reduce image on xs
                        }
                    }
                }} key={product.id}>
                    <ProductCard product={product} />
                </Grid2>
            ))}
        </Grid2>
    )
}
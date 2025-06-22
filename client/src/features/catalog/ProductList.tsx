import { Box } from "@mui/material"
import type { Product } from "../../app/models/product"
import ProductCard from "./ProductCard"

type props = {
products: Product[]
}

export default function ProductList({products}: props) {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
            {products.map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}
        </Box>
    )
}
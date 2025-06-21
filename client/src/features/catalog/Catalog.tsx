import { Button } from "@mui/material";
import type { Product } from "../../app/models/product"

type Props = {
  products: Product[];
  addProduct: () => void
}

export default function Catalog({products, addProduct}: Props) {
  return (
    <>
      <ul>
        {products.map((product, index) => (
          <li key={index}>{product.name} - ${product.price}</li>
        ))}
      </ul>
      <Button variant="contained" onClick={addProduct}>AddProduct</Button>
    </>
  )
}
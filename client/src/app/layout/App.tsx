import { useEffect, useState } from "react"
import type { Product } from "../models/product"
import Catalog from "../../features/catalog/Catalog"
import { Container, Typography } from "@mui/material"

function App() {

const [products, setProducts] = useState<Product[]>([])

useEffect(() => {
  fetch('https://localhost:5001/api/products')
    .then(response => response.json())
    .then(data => setProducts(data))
}, [])

const addProduct = () => {
  setProducts(prevstate => [...prevstate, {
    id: prevstate.length + 1,
    description: 'Description of product ' + (prevstate.length + 1),
    pictureUrl: 'https://picsum.photos/200/300?random=' + (prevstate.length + 1),
    type: 'Type ' + (prevstate.length + 1),
    brand: 'Brand ' + (prevstate.length + 1),
    quantityStock: 10,
    name: 'Product ' + (prevstate.length +1), 
    price: (prevstate.length * 100) + 100
  }
  ])
}

  return (
    <Container maxWidth="xl">
      <Typography variant="h4">Re-Store</Typography>
      <Catalog products={products} addProduct ={addProduct}></Catalog>
      
    </Container>
  )
}

export default App

import { useEffect, useState } from "react"
import type { Product } from "../models/product"

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
    <div>
      <h1>Restore</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>{product.name} - ${product.price}</li>
        ))}
      </ul>
      <button onClick={addProduct}>AddProduct</button>
    </div>
  )
}

export default App

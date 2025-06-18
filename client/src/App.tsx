import { useState } from "react"

function App() {

const [products, setProducts] = useState([
  { name: 'Product 1', price: 100 },
  { name: 'Product 2', price: 200 },
])

const addProduct = () => {
  setProducts(prevstate => [...prevstate, {name: 'Product '+ (prevstate.length +1), price: (prevstate.length * 100) + 100}])
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

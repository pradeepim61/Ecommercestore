import ProductList from "./ProductList";
import { useFetchProductsQuery } from "./catalogApi";


export default function Catalog() {
  const {data, isLoading} = useFetchProductsQuery();

  // const [products, setProducts] = useState<Product[]>([])

  // useEffect(() => {
  //   fetch('https://localhost:5001/api/products')
  //     .then(response => response.json())
  //     .then(data => setProducts(data))
  // }, [])

  if(data === undefined || isLoading) return <h3>Loading...</h3>;

  return (
    <>
      <ProductList products={data}></ProductList>
    </>
  )
}
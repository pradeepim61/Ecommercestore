import { Grid2, Typography } from "@mui/material";
import ProductList from "./ProductList";
import { useFetchFiltersQuery, useFetchProductsQuery } from "./catalogApi";
import Filters from "./filters";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import AppPagination from "../../app/shared/components/AppPagination";
import { setPageNumber } from "./catalogSlice";

export default function Catalog() {
  const productParams = useAppSelector(state => state.catalog);
  const { data, isLoading } = useFetchProductsQuery(productParams);
  const { data: filterData, isLoading: filtersLoading } = useFetchFiltersQuery();

  const dispatch = useAppDispatch();
  // const [products, setProducts] = useState<Product[]>([])
  // useEffect(() => {
  //   fetch('https://localhost:5001/api/products')
  //     .then(response => response.json())
  //     .then(data => setProducts(data))
  // }, [])

  if (data === undefined || isLoading || filterData === undefined || filtersLoading) return <h3>Loading...</h3>;

  return (
    <Grid2 container spacing={4}>
      <Grid2 size={3}>
        <Filters filterData={filterData} />
      </Grid2>
      <Grid2 size={9}>
        {data && data.items.length > 0 ? (
          <>
            <ProductList products={data.items}></ProductList>
            <AppPagination metaData={data.pagination} onPageChange={(page: number) => {dispatch(setPageNumber(page)); window.scrollTo({top:0, behavior:'smooth'})}} />
          </>
        ) : (
          <Typography>There are no results for this filter.</Typography>
        )}

      </Grid2>
    </Grid2>
  )
}
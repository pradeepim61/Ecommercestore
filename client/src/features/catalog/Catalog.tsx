import { Box, Button, Drawer, Grid2, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ProductList from "./ProductList";
import { useFetchFiltersQuery, useFetchProductsQuery } from "./catalogApi";
import Filters from "./Filters";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import AppPagination from "../../app/shared/components/AppPagination";
import { setPageNumber } from "./catalogSlice";
import { useState } from "react";

export default function Catalog() {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('md'));
  const productParams = useAppSelector(state => state.catalog);
  const { data, isLoading } = useFetchProductsQuery(productParams);
  const { data: filterData, isLoading: filtersLoading } = useFetchFiltersQuery();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  console.log(isSmUp);
  const dispatch = useAppDispatch();
  // const [products, setProducts] = useState<Product[]>([])
  // useEffect(() => {
  //   fetch('https://localhost:5001/api/products')
  //     .then(response => response.json())
  //     .then(data => setProducts(data))
  // }, [])

  if (data === undefined || isLoading || filterData === undefined || filtersLoading) return <h3>Loading...</h3>;

  return (
    <Grid2 container spacing={2}>
      {/* Mobile Filters Button */}

      {!isSmUp && (
        <Button
          variant="contained"
          onClick={() => setMobileFiltersOpen(true)}
        >
          Show Filters
        </Button>
      )}

      <Drawer
        anchor="left"
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
          }}
        >
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={() => setMobileFiltersOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ width: 250, p: 2 }}>
          <Filters filterData={filterData} />
        </Box>
      </Drawer>

      {/* Filters Column - Hidden on small screens */}
      {isSmUp && (
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Filters filterData={filterData} />
        </Grid2>
      )}

      <Grid2 size={{ xs: 12, md: 9 }}>
        {data && data.items.length > 0 ? (
          <>
            <ProductList products={data.items}></ProductList>
            <AppPagination metaData={data.pagination} onPageChange={(page: number) => { dispatch(setPageNumber(page)); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
          </>
        ) : (
          <Typography>There are no results for this filter.</Typography>
        )}

      </Grid2>
    </Grid2>
  )
}
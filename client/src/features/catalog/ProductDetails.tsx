import { useParams } from "react-router-dom";
import { Button, Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogApi";

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();

    const { data: product, isLoading } = useFetchProductDetailsQuery(id ? parseInt(id!) : 0);
    // const [product, setProduct] = useState<Product | null>(null);

    // useEffect(() => {
    //     fetch(`https://localhost:5001/api/products/${id}`)
    //         .then(response => response.json())
    //         .then(data => setProduct(data))
    //         .catch(error => console.error('Error fetching product:', error));
    // }, [id])

    if (!product || isLoading) return <h2>Loading...</h2>;

    const productDetails = [
        { label: 'Name', value: product?.name },
        { label: 'Description', value: product?.description },
        { label: 'Brand', value: product?.brand },
        { label: 'Type', value: product?.type },
        { label: 'Quantity in Stock', value: product?.quantityStock }
    ]

    return (
        <Grid2 container spacing={6} maxWidth='lg' justifyContent="center">
            <Grid2 size={{ xs: 12, md: 6 }}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
            </Grid2>
            <Grid2 size={{xs: 12, md: 6}}>
                <Typography variant="h2">{product.name}</Typography>
                <Divider sx={{ mb: 2 }}></Divider>
                <Typography variant="h4" color="secondary" sx={{ mb: 2 }}>${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            {productDetails.map((detail, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{fontWeight: 'bold'}}>{detail.label}</TableCell>
                                    <TableCell>{detail.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid2 container spacing={2} marginTop={3}>
                    <Grid2 size={6}>
                        <TextField  variant="outlined" type="number" label='Quantity in basket' fullWidth defaultValue={1}></TextField>
                    </Grid2>
                    <Grid2 size={6}>
                        <Button sx={{height:'55px'}} color="primary" size="large" variant="contained" fullWidth>Add to Basket</Button>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Grid2>
    )
}
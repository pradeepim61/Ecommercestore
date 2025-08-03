import { Box, Button, Paper } from "@mui/material";
import Search from "./Search";
import { resetParams, setBrands, setOrderBy, setTypes } from "./catalogSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";
import CheckBoxButtons from "../../app/shared/components/CheckBoxButtons";

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price: From High to Low' },
    { value: 'price', label: 'Price: From Low to High'} 
]

type Props = {
filterData:{brands: string[];types: string[];}
}

export default function Filters({filterData : data}: Props) {
    const {orderBy, types, brands} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    
    //console.log(data);
    //if (isLoading || !data) return <div>Loading...</div>

    return (
        <Box display='flex' flexDirection='column' gap={3}>
            <Paper>
                <Search />
            </Paper>
            <Paper sx={{ p: 3 }}>
            <RadioButtonGroup selectedValue={orderBy} options={sortOptions} onChange={e => dispatch(setOrderBy(e.target.value))}/>
            </Paper>
            <Paper sx={{ p: 3 }}>
            <CheckBoxButtons items={data.brands} checked={brands} onChange={(items: string[]) => dispatch(setBrands(items))}/>
            </Paper>
            <Paper sx={{ p: 3 }}>
            <CheckBoxButtons items={data.types} checked={types} onChange={(items: string[]) => dispatch(setTypes(items))}/>
            </Paper>
            <Button onClick={() => dispatch(resetParams())}>Reset Filters</Button>
        </Box>
    )
}
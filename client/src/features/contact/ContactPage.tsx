import { useDispatch } from "react-redux";
import { decrement, increment } from "./counterReducer";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppSelector } from "../../app/store/store";

export default function ContactPage() {
    const {data} = useAppSelector(state => state.counter);
    const dispatch = useDispatch();

    return (
        <>
            <Typography variant="h2">
                Contact Page
            </Typography>
            <Typography variant="body1">
                the data is : {data}
            </Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(decrement(1))} color="error">Decrement</Button>
                <Button onClick={() => dispatch(increment(1))} color="success">Increment</Button>
                <Button onClick={() => dispatch(increment(10))} color="primary">Increment by 10</Button>
            </ButtonGroup>
        </>
    )
}
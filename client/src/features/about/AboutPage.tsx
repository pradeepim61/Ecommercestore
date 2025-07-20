import {  Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, Typography } from "@mui/material";
import { useLazyGet400ErrorQuery, useLazyGet401ErrorQuery, useLazyGet404ErrorQuery, useLazyGet500ErrorQuery, useLazyGetValidationErrorQuery } from "./errorApi";
import { useState } from "react";

export default function AboutPage() {

    const [validationError, setValidationError] = useState<string[]>([]);

    const [trigger400Error] = useLazyGet400ErrorQuery();
    const [trigger401Error] = useLazyGet401ErrorQuery();
    const [trigger404Error] = useLazyGet404ErrorQuery();
    const [trigger500Error] = useLazyGet500ErrorQuery();
    const [triggerValidationError] = useLazyGetValidationErrorQuery();

    const getValidationError = async () => {
        try {
            await triggerValidationError().unwrap();
        }
        catch (error: unknown) {
            console.log('Validation Error:', error);
            
            if (error && typeof error === 'object' && 'message' in error && typeof (error as { message: string }).message === 'string') {
                const errorarray = (error as { message: string }).message.split(', ');
                console.log(errorarray);
                setValidationError(errorarray);
            }
        }
    }

    return (
        <div>
            <Container maxWidth="lg">
                <Typography gutterBottom variant="h3">Errors for testing</Typography>
                <ButtonGroup>
                    <Button variant="contained" onClick={() => trigger400Error().catch((err: unknown) => console.log(err))}>
                        Test 400 Error</Button>
                    <Button variant="contained" onClick={() => trigger401Error().catch((err: unknown) => console.log(err))}>
                        Test 401 Error</Button>
                    <Button variant="contained" onClick={() => trigger404Error().catch((err: unknown) => console.log(err))}>
                        Test 404 Error</Button>
                    <Button variant="contained" onClick={() => trigger500Error().catch((err: unknown) => console.log(err))}>
                        Test 500 Error</Button>
                    <Button variant="contained" onClick={getValidationError}>
                        Test validation Error</Button>
                </ButtonGroup>
                {validationError.length > 0 && (
                    <Alert severity="error">
                        <AlertTitle >Validation Errors</AlertTitle>
                        <List>
                            {validationError.map(err => (
                                <ListItem key={err}>{err}</ListItem>
                            ))}
                        </List>
                    </Alert>
                )}
            </Container>
        </div>
    )
}
import { Box, Button, Paper, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";

const steps = ['Address', 'Payment', 'Review'];

export default function CheckoutStepper() {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    }

    return (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    return (
                        <Step key={index}>
                            <StepLabel>
                                {label}
                            </StepLabel>
                        </Step>
                    )
                })}
            </Stepper>

            <Box>
                <Box sx={{ display: activeStep === 0 ? 'block' : 'none' }}>
                    Address Step
                </Box>
                <Box sx={{ display: activeStep === 1 ? 'block' : 'none' }}>
                    Payment Step
                </Box>
                <Box sx={{ display: activeStep === 2 ? 'block' : 'none' }}>
                    Review Step
                </Box>
            </Box>

            <Box display={'flex'} justifyContent="space-between" mt={2}>
                <Button onClick={handleBack}>Back</Button>
                <Button onClick={handleNext}>Next</Button>
            </Box>
        </Paper >
    )
}
import { Box, Button, Checkbox, FormControlLabel, Paper, Step, StepLabel, Stepper } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Review from "./Review";
import { useFetchAdressQuery, useUpdateAddressMutation } from "../account/accountApi";
import type { Address } from "../../app/models/user";
import type { ConfirmationToken, StripeAddressElementChangeEvent, StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { useBasket } from "../../lib/hooks/useBasket";
import { currencyFormat } from "../../lib/util";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const steps = ['Address', 'Payment', 'Review'];

export default function CheckoutStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const { data, isLoading } = useFetchAdressQuery();
    const { name, ...restAddress } = data || {} as Address;
    const [updatAdadress] = useUpdateAddressMutation();
    const [saveaddresschecked, setSaveAddresschecked] = useState(false);
    const [addressComplete, setAddressComplete] = useState(false);
    const [paymentComplete, setPaymentComplete] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const { basket, clearBasket } = useBasket();
    const elements = useElements();
    const navigate = useNavigate();
    const stripe = useStripe();
    const { total } = useBasket();
    const [confirmationToken, setConfirmationToken] = useState<ConfirmationToken | null>(null);

    const handleNext = async () => {
        if (activeStep === 0 && saveaddresschecked && elements) {
            const address = await getStripeAddress();
            if (address) updatAdadress(address);
        }

        if (activeStep === 1) {
            if (!stripe || !elements) return;

            const result = await elements.submit();

            if (result.error) return toast.error(result.error.message);

            const stripreResult = await stripe.createConfirmationToken({ elements });
            if (stripreResult.error) return toast.error(stripreResult.error.message);
            setConfirmationToken(stripreResult.confirmationToken ?? null);
        }

        if (activeStep === steps.length - 1) return confirmPayment();
        if(activeStep < 2) setActiveStep(activeStep + 1);
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    }

    if (isLoading) return <h6>Loading Chekout..</h6>;

    const handleAddressComplete = (event: StripeAddressElementChangeEvent) => {
        setAddressComplete(event.complete);
    }

    const handlePaymentComplete = (event: StripePaymentElementChangeEvent) => {
        setPaymentComplete(event.complete);
    }

    const getStripeAddress = async () => {
        const addressElement = elements?.getElement(AddressElement);
        if (!addressElement) return null;

        const result = await addressElement.getValue();
        const value = result.value;

        return {
            name: value.name ?? '',
            line1: value.address?.line1 ?? '',
            line2: value.address?.line2 ?? '',
            postal_code: value.address?.postal_code ?? '',
            city: value.address?.city ?? '',
            state: value.address?.state ?? '',
            country: value.address?.country ?? ''
        } as Address;
    }

    const confirmPayment = async () => {
        setSubmitting(true);
        try {
            if (!confirmationToken || !basket?.clientSecret)
                throw new Error('Unable to process payment');

            const paymentResult = await stripe?.confirmPayment({
                clientSecret: basket.clientSecret,
                redirect: 'if_required',
                confirmParams: {
                    confirmation_token: confirmationToken.id
                }
            });

            if (paymentResult?.paymentIntent?.status === 'succeeded') {
                navigate('/checkout/success');
                clearBasket();
            } else if (paymentResult?.error) {
                toast.error(paymentResult.error.message);
            } else {
                toast.error('Payment failed');
            }
        } catch (error) {
            if (error instanceof Error) toast.error(error.message);
            setActiveStep(activeStep - 1);
        } finally {
            setSubmitting(false);
        }
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

                <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: activeStep === 0 ? 'block' : 'none' }}>
                        <AddressElement options={{ mode: 'shipping', defaultValues: { name: name, address: restAddress } }} onChange={handleAddressComplete} />
                        <FormControlLabel sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}
                            control={<Checkbox checked={saveaddresschecked} onChange={e => setSaveAddresschecked((e.target as HTMLInputElement).checked)} />} label="Save as default address"></FormControlLabel>
                    </Box>
                    <Box sx={{ display: activeStep === 1 ? 'block' : 'none' }}>
                        <PaymentElement onChange={handlePaymentComplete} />
                    </Box>
                    <Box sx={{ display: activeStep === 2 ? 'block' : 'none' }}>
                        <Review confirmationToken={confirmationToken} />
                    </Box>
                </Box>

                <Box display={'flex'} justifyContent="space-between" mt={2}>
                    <Button onClick={handleBack}>Back</Button>
                    <LoadingButton onClick={handleNext} disabled={(!addressComplete && activeStep === 0) || (!paymentComplete && activeStep === 1) ||
                        submitting} loading={submitting}>{activeStep === steps.length - 1 ? `Pay ${currencyFormat(total)}` : 'Next'}
                    </LoadingButton>
                </Box>
            </Paper >
        )
    }
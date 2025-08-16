import { useForm } from "react-hook-form";
import { useRegisterMutation } from "./accountApi"
import { registerSchema, type RegisterSchema } from "../../lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";

export default function RegisterForm() {
    const [registerUser] = useRegisterMutation();
    const { register, handleSubmit, setError, formState: { errors, isValid, isLoading } } = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema)
    })

    //const navigate = useNavigate();
   // Watch password value to compare with confirm password
   // const password = watch("password");
    
    const onSubmit = async (data: RegisterSchema) => {
        try {
            await registerUser(data);
            //navigate('/login');
        } catch (error) {
            console.error("Register failed:", error);
            const apiError = error as { message: string }
            if (apiError.message && typeof apiError.message === 'string') {
                const errorArray = apiError.message.split(',');

                errorArray.forEach(e => {
                    if (e.includes('Password')) {
                        setError('password', { message: e })
                    }
                    else if (e.includes('Email')) {
                        setError('email', { message: e })
                    }
                })
            }
        }
    };

    return (
        <Container component={Paper} maxWidth='sm' sx={{ borderRadius: 3 }}>
            <Box display='flex' flexDirection='column' alignItems='center' marginTop='8'>
                <LockOutlined sx={{ mt: 3, color: 'secondary.main', fontSize: 40 }}></LockOutlined>
                <Typography>
                    Register
                </Typography>
                <Box component='form' onSubmit={handleSubmit(onSubmit)} width='100%' display='flex' flexDirection='column' gap={3} marginY={3}>
                    <TextField fullWidth label='Email' autoFocus {...register('email')} error={!!errors.email} helperText={errors.email?.message}></TextField>
                    <TextField fullWidth label='Password' type="password" {...register('password')} error={!!errors.password} helperText={errors.password?.message}></TextField>
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        {...register('confirmPassword')}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                    <Button variant="contained" disabled={isLoading || !isValid} type="submit">Register</Button>
                    <Typography sx={{ textAlign: 'center' }}>
                        Already have an account?
                        <Typography sx={{ ml: 2 }} component={Link} to='/login' color='primary'>
                            Sign in here
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}

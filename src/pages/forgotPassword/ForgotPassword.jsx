import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Backdrop, CircularProgress, LinearProgress } from '@mui/material';
import { forgot_password, sign_in_user, validateEmail } from '../../services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile } from '../../redux/UserProfileSlice';
import { checkIfLoggedIn } from '../../services/GlobalService';



export default function ForgotPassword() {
    const [isLoading, setIsLoading] = React.useState(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.userProfile);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (validateEmail(data.get('email')) == false) {
            alert("Please enter a valid email");
        }        
        else {
            setIsSubmitting(true);

            const payload = {
                email: data.get('email'),                
            }

            await forgot_password(payload).then(result => {                                
                alert(result.data);
                localStorage.setItem("email", payload.email);
                setIsSubmitting(false);
                window.location.href = "resetPassword";
            }).catch(error => {                
                setIsSubmitting(false);                
                alert("Oops! Something went wrong while sending you the verification code.")
            });
        };
    }

    const authGuard = async () => {
        await checkIfLoggedIn().then(response => {
            if (response == true) {
                window.location.href = "/";
            }
            setIsLoading(false);
        });
    }

    React.useEffect(() => {
        if (isLoading == null) {
            setIsLoading(true);
            authGuard();
        }
    }, [isLoading, isSubmitting]);

    if (isLoading != false) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                overflow: "hidden"
            }}>
                <CircularProgress />                
                <Typography style={{ marginLeft: 20 }} variant="body1">Loading ...</Typography>
            </div>
        )
    }

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?programming)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Forgot Password
                    </Typography>
                    <Box component="form" noValidate={false} onSubmit={handleSubmit} width={"100%"}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />                       
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {(isSubmitting == true) ? "Signing in ..." : "Sign In"}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            </Grid>
                            <Grid item>
                                <Link href="/signIn" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}


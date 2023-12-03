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
import { sign_in_user, validateEmail } from '../../services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile } from '../../redux/UserProfileSlice';
import { checkIfLoggedIn } from '../../services/GlobalService';
import { useNavigate } from 'react-router-dom';



export default function SignIn() {
    const [isLoading, setIsLoading] = React.useState(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profile } = useSelector((state) => state.userProfile);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (validateEmail(data.get('email')) == false) {
            alert("Please enter a valid email");
        }
        else if (data.get('password')?.length < 8) {
            alert("Please enter a valid Password. It must have at least 8 characters.");
        }
        else {
            setIsSubmitting(true);

            const payload = {
                email: data.get('email'),
                password: data.get('password')
            }

            await sign_in_user(payload).then(result => {
                localStorage.setItem("auth_token", result?.data?.auth_token);
                delete result.data.auth_token;
                localStorage.setItem("user_profile", JSON.stringify(result?.data));
                dispatch(setUserProfile(result.data));
                setIsSubmitting(false);
                navigate('/');
            }).catch(error => {
                setIsSubmitting(false);
                if (error?.response?.data == "invalidCredentials") {
                    alert("Seems like you provided an incorrect email or password!")
                }
                else {
                    alert("Oops! Something went wrong while authenticating you.")
                }
            });
        };
    }

    const authGuard = async () => {
        await checkIfLoggedIn().then(response => {
            if (response == true) {
                navigate('/');
                return
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
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
                        Sign In
                    </Typography>
                    <Box component="form" noValidate={false} onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
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
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => {
                                        navigate("/forgotPassword")
                                    }}
                                >
                                    Forgot your password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => {
                                        navigate("/signUp")
                                    }}
                                >
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}


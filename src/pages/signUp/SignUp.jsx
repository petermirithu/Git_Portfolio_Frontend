import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Backdrop, CircularProgress } from '@mui/material';
import { sign_up_user, validateEmail } from '../../services/UserService';
import { useSelector } from 'react-redux';
import { checkIfLoggedIn } from '../../services/GlobalService';
import { check_git_hub_user } from '../../services/GitService';


export default function SignUp() {
    const [isLoading, setIsLoading] = React.useState(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    
    const { profile } = useSelector((state) => state.userProfile);

    const handleSubmit = async (event) => {        
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        if (data.get('firstName')?.length < 3) {
            alert("Please enter a valid first name");
        }
        else if (data.get('lastName')?.length < 3) {
            alert("Please enter a valid last name");
        }
        else if (validateEmail(data.get('email')) == false) {
            alert("Please enter a valid email");
        }
        else if (data.get('password').length < 8) {
            alert("Please enter a valid Password. It must have at least 8 characters.");
        }
        else {
            setIsSubmitting(true);
            const payload = {
                first_name: data.get('firstName'),
                last_name: data.get('lastName'),
                email: data.get('email'),
                password: data.get('password')                
            }                     

            await check_git_hub_user(payload.email).then(async response=>{                
                if(response.data.total_count==1){
                    await sign_up_user(payload).then(result => {
                        setIsSubmitting(false);
                        alert("Successfully created an account for you.\nNow sign in to verify your account!");
                        window.location.href = "/signIn"
                    }).catch(error => {                        
                        setIsSubmitting(false);
                        if (error?.response?.data == "emailTaken") {
                            alert("Oops! Seems like the email you used is already taken")
                        }
                        else {
                            alert("Oops! Something went wrong while creating your account.")
                        }
                    });
                }
                else{
                    setIsSubmitting(false);
                    alert("The email you entered is NOT linked to any git hub account!")
                }                
            }).catch(error => {                
                alert("Ooops! Something went wrong while looking you up in Git Hub")
            });            
        }
    };

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
                overflow:"hidden"
            }}>
                <CircularProgress />                
                <Typography style={{ marginLeft: 20 }} variant="body1">Loading ...</Typography>
            </div>
        )
    }

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading != false}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
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
                        Sign Up
                    </Typography>
                    <Box component="form" noValidate={false} onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {(isSubmitting == true) ? "Signing up ..." : "Sign Up"}
                        </Button>
                        <Grid container justifyContent="flex-end">
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


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
import { reset_password, sign_in_user, validateEmail } from '../../services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile } from '../../redux/UserProfileSlice';
import { checkIfEmail, checkIfLoggedIn } from '../../services/GlobalService';
import { useNavigate } from 'react-router-dom';



export default function ResetPassword() {
    const [isLoading, setIsLoading] = React.useState(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [email, setEmail] = React.useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profile } = useSelector((state) => state.userProfile);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (email == null) {            
            alert("Seems like your email was not cached. Got back to forgot password page to and enter the email again.")            
            navigate('/forgotPassword');
        }
        else if (data.get('verificationCode')?.length != 6) {
            alert("Please enter a valid verification code that is 6 characters");
        }        
        else if (data.get('newPassword')?.length < 8) {
            alert("Please enter a valid Password. It must have at least 8 characters.");
        }
        else if (data.get('newPassword') != data.get('confirmPassword')) {
            alert("Confirm password must be the same as the new password.");
        }
        else {
            setIsSubmitting(true);

            const payload = {
                email: email,
                verificationCode: data.get('verificationCode'),
                password: data.get('newPassword')
            }            

            await reset_password(payload).then(result => {
                alert("Successfully reset your password!\nYou can now Sign in using your new password.")
                setIsSubmitting(false);                
                navigate('/signIn');
            }).catch(error => {
                console.log(error)
                setIsSubmitting(false);                                                
                if (error?.response?.data == "invalidVerificationCode") {
                    alert("Oops! The code you entered is incorrect!");
                }
                else if (error?.response?.data == "codeExpired") {
                    alert("Oops! The code you entered has expired. Please go back to forgot password and initiate the process.");
                }
                else{                   
                    alert("Oops! Something went wrong while reseting your password.")
                }
            });
        };
    }

    const authGuard = async () => {
        await checkIfLoggedIn().then(async response => {
            if (response == true) {                
                navigate('/');
                return
            }            
            await checkIfEmail().then(result=>{
                setEmail(result);
                setIsLoading(false);
            });
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
                        Reset password
                    </Typography>
                    <Box component="form" noValidate={false} onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="verificationCode"
                            label="Verification code"
                            name="verificationCode"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="newPassword"
                            label="New Password"
                            type="password"
                            id="newPassword"
                            autoComplete="current-password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
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
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}


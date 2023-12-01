import * as React from 'react';
import Tabs from './tabs';
import Sidebar from '../../Components/Sidebar';
import { checkIfLoggedIn } from '../../services/GlobalService';
import { CircularProgress, Grid, Typography } from '@mui/material';
import Navbar from '../../Components/navbar';
import { useDispatch, useSelector } from 'react-redux';
import { check_git_hub_user, fetch_git_hub_user_profile } from '../../services/GitService';
import { setGitProfile } from '../../redux/UserProfileSlice';
import Store from '../../redux/Store';

export default function Home() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(true);
    const didMount = React.useRef(false)

    const initPage = async () => {
        const { profile } = Store.getState().userProfile;
        await check_git_hub_user(profile.email).then(async response => {            
            await fetch_git_hub_user_profile(response.data.items[0].login).then(async response => {
                setIsLoading(false);
                dispatch(setGitProfile(response.data));                
            }).catch(error => {
                setIsLoading(false);
                alert("Ooops! Something went wrong while fetching your profile details from Git Hub")
            });
        }).catch(error => {
            setIsLoading(false);
            alert("The email you entered is NOT linked to any git hub account!")
        });
    }

    const authGuard = async () => {
        await checkIfLoggedIn().then(response => {
            if (response != true) {
                window.location.href = "signIn";
            }
            initPage()
        });
    }

    React.useEffect(() => {
        if (didMount.current == false) {
            didMount.current = true
            authGuard();
        }
    }, [isLoading]);

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
        <div>
            <Navbar />
            <Grid container>
                <Grid item xs={2.5} minHeight={"100vh"}>
                    <Sidebar />
                </Grid>
                <Grid item xs={9.5}>
                    <Tabs />
                </Grid>
            </Grid>


        </div>
    );
}


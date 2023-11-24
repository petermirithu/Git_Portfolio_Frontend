import * as React from 'react';
import Tabs from './tabs';
import { checkIfLoggedIn } from '../../services/GlobalService';
import { CircularProgress } from '@mui/material';

export default function Home() {
    const [isLoading, setIsLoading] = React.useState(null);
    
    const authGuard = async () => {                
        await checkIfLoggedIn().then(response => {
            console.log(response)
            if (response != true) {
                window.location.href = "signIn";
            }            
            setIsLoading(false);
        });
    }

    React.useEffect(() => {
        if (isLoading == null) {
            setIsLoading(true);
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
                overflow:"hidden"
            }}>
                <CircularProgress />                
                <p style={{marginLeft: 20}}>Loading ...</p>
            </div>
        )
    }

   return (
       <>
       <Tabs/>
       </>
   );
}


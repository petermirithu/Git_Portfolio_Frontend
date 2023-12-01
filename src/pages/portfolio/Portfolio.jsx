import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Tabs from '../home/tabs';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Portfolio() {
    const { email } = useParams();
    const [isLoading, setIsLoading] = React.useState(true);
    const didMount = React.useRef(false)



    React.useEffect(() => {
        console.log(email)

        if (didMount.current == false) {
            didMount.current = true
            // authGuard();
            setIsLoading(false);
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
        <main>
            {/* Hero unit */}
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Hello, My name is Pyra.
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        I am a Software Engineer passionate about Python and JavaScript. I specialize in Software and Mobile App Development with AI integrations from scratch.
                    </Typography>

                </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Tabs></Tabs>               
            </Container>
        </main>
    );
}
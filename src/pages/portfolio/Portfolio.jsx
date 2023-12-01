import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Tabs from '../home/tabs';
import Navbar from '../../Components/navbar';
import { check_git_hub_user, fetch_git_hub_user_profile } from '../../services/GitService';
import { setGitProfile } from '../../redux/UserProfileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { get_user } from '../../services/UserService';

const theme = createTheme();

const socialPlatforms = [
  { name: 'GitHub', key: 'github', icon: <GitHubIcon /> },
  { name: 'LinkedIn', key: 'linkedin', icon: <LinkedInIcon /> },
  { name: 'Twitter', key: 'twitter', icon: <TwitterIcon /> },
  { name: 'YouTube', key: 'youtube', icon: <YouTubeIcon /> },
  { name: 'WhatsApp', key: 'whatsapp', icon: <WhatsAppIcon /> },
];

export default function Portfolio() {
  const dispatch = useDispatch();
  const { email } = useParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const didMount = React.useRef(false);
  const [socialLinks, setSocialLinks] = React.useState({
    github: '',
    linkedin: '',
    twitter: '',
    youtube: '',
    whatsapp: '',
  });
  const { gitProfile } = useSelector((state) => state.userProfile);


  const getUser = async () => {
    await check_git_hub_user(email).then(async response => {
      await fetch_git_hub_user_profile(response.data.items[0].login).then(async response => {
        dispatch(setGitProfile(response.data));
        setIsLoading(false);
        // await get_user(email).then(result => {          
        //   setSocialLinks({
        //     github: result.data.github,
        //     linkedin: result.data.linkedin,
        //     twitter: result.data.twitter,
        //     youtube: result.data.youtube,
        //     whatsapp: result.data.whatsapp,
        //   })

        // }).catch(error => {
        //   setIsLoading(false);
        //   alert("Ooops! Something went wrong while fetching the user profile details from our server")
        // })
      }).catch(error => {
        setIsLoading(false);
        alert("Ooops! Something went wrong while fetching the user profile details from Git Hub")
      });
    }).catch(error => {
      setIsLoading(false);
      alert("The email you entered is NOT linked to any git hub account!")
    });
  }

  React.useEffect(() => {
    if (didMount.current === false) {
      didMount.current = true;
      getUser();
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <CircularProgress />
        <Typography style={{ marginLeft: 20 }} variant="body1">
          Loading ...
        </Typography>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Typography
        component="h2"
        variant="h4"
        align="center"
        color="text.primary"
        gutterBottom
        sx={{ mt: 3, fontStyle: 'italic', fontWeight: 'bold', fontSize: '2.5rem' }}
      >
        Welcome to My Portfolio
      </Typography>

      <main>
        <Container
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} sx={{ textAlign: 'left' }}>
              <Avatar
                alt="Pyra Avatar"
                src={gitProfile.avatar_url}
                sx={{
                  width: 500,
                  height: 500,
                  float: 'left',
                  marginRight: '16px',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h4"
                  align="left"
                  color="text.primary"
                  gutterBottom
                  sx={{ marginTop: 10 }}
                >
                  Hello, My name is {gitProfile.name || "N/A"}
                </Typography>
                <Typography
                  variant="h6"
                  align="left"
                  color="text.secondary"
                  paragraph
                  sx={{ marginTop: 2 }}
                >
                  {gitProfile.bio || "N/A"}
                </Typography>
                <Container
                  sx={{
                    bgcolor: 'background.paper',
                    pt: 4,
                    pb: 4,
                    textAlign: 'center',
                    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',

                  }}
                >
                  <Typography
                    component="h6"
                    variant="h6"
                    align="center"
                    color="text.primary"
                    gutterBottom
                    sx={{ fontStyle: 'italic', fontWeight: 'light' }}
                  >
                    You can find at:-
                  </Typography>
                  <ButtonGroup
                    orientation="horizontal"
                    sx={{
                      mt: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      gap: 2,
                    }}
                  >
                    {socialPlatforms.map((platform) => (
                      <Tooltip title={platform.name} arrow key={platform.key}>
                        <Button
                          color="primary"
                          onClick={() => window.open(socialLinks[platform.key], '_blank')}
                          sx={{
                            '&:hover': {
                              backgroundColor: '#007BFF',
                            },
                          }}
                        >
                          {platform.icon}
                        </Button>
                      </Tooltip>
                    ))}
                  </ButtonGroup>
                </Container>
              </Container>
            </Grid>
            {/* Contacts section */}

          </Grid>
        </Container>

        {/* Cards section */}
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* <Tabs /> */}
        </Container>
      </main>
    </ThemeProvider>
  );
}

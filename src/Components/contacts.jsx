import React, { useState, useEffect, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, CircularProgress } from '@mui/material';
import { update_socials } from '../services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile } from '../redux/UserProfileSlice';

const socialPlatforms = [
  { name: 'GitHub', key: 'github', icon: <GitHubIcon /> },
  { name: 'LinkedIn', key: 'linkedin', icon: <LinkedInIcon /> },
  { name: 'Twitter', key: 'twitter', icon: <TwitterIcon /> },
  { name: 'YouTube', key: 'youtube', icon: <YouTubeIcon /> },
  { name: 'WhatsApp', key: 'whatsapp', icon: <WhatsAppIcon /> },
];

export default function ContactTab({ avatar, fullName }) {
  const { profile } = useSelector((state) => state.userProfile);
  const didMount = useRef(false)
  const dispatch = useDispatch();
  const [socialLinks, setSocialLinks] = useState({
    github: profile?.github,
    linkedin: profile?.linkedin,
    twitter: profile?.twitter,
    youtube: profile?.youtube,
    whatsapp: profile?.whatsapp,
    user_id: profile.id
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLinkChange = (platform, link) => {
    setSocialLinks((prevLinks) => ({
      ...prevLinks,
      [platform]: link,
    }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    await update_socials(socialLinks).then(response => {
      let tempProfile = {...profile};
      tempProfile.github=socialLinks.github;
      tempProfile.linkedin=socialLinks.linkedin;
      tempProfile.twitter=socialLinks.twitter;
      tempProfile.youtube=socialLinks.youtube;
      tempProfile.whatsapp=socialLinks.whatsapp;
            
      localStorage.setItem("user_profile", JSON.stringify(tempProfile));
      dispatch(setUserProfile(tempProfile));
      setIsSubmitting(false);
      alert("Successfully updated the socials.");
    }).catch(error => {
      console.log(error);
      setIsLoading(false);
      alert("Ooops! Something went wrong while updating the socials")
    });

  };

  useEffect(() => {
    if (didMount.current == false) {
      didMount.current = true      
      setIsLoading(false);
    }
  }, [isLoading, isSubmitting]);

  return (
    <>
      <br></br>
      <br></br>
      {(isLoading != false) ?
        <Box
          component="div"
        >
          <CircularProgress />
          <Typography variant="body1">Loading ...</Typography>
        </Box>
        :
        <>
          <Card sx={{ position: 'relative', boxShadow: 'lg', margin: 'auto', border: '2px solid #000', transition: 'transform 0.4s', '&:hover': { transform: 'scale(1.03)' }, transformOrigin: 'center' }}>
            <CardContent sx={{ alignItems: 'center', textAlign: 'center'}}>
              <Avatar src={avatar} sx={{ '--Avatar-size': '4rem' }} />
              <Typography level="title-lg">{fullName}</Typography>
              <Typography level="body-sm" sx={{ maxWidth: '24ch', mb: 2 }}>
                Hello, this is my Contact card. Feel free to connect with me!
              </Typography>
              <ButtonGroup orientation="vertical" sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>                
                {socialPlatforms.map((platform) => (
                  <TextField
                    key={platform.key}
                    label={platform.name}
                    value={socialLinks[platform.key]}
                    onChange={(e) => handleLinkChange(platform.key, e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <Tooltip title={platform.name} arrow>
                          <IconButton sx={{ ml: 1 }} onClick={() => window.open(socialLinks[platform.key], '_blank')}>
                            {platform.icon}
                          </IconButton>
                        </Tooltip>
                      ),
                    }}
                    sx={{ mb: 1 }}
                  />
                ))}
              </ButtonGroup>
              <Button style={{ alignContent: "center" }} disabled={isSubmitting} variant="contained" color="primary" onClick={handleSave}>
                {isSubmitting ?
                  <>
                    Saving the Socials ...
                  </>
                  :
                  <>
                    Save Socials
                  </>
                }
              </Button>
            </CardContent>            
          </Card>
        </>
      }
    </>
  );
}

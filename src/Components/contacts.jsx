import React, { useState, useEffect } from 'react';
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
import { Box } from '@mui/material';

const socialPlatforms = [
  { name: 'GitHub', key: 'github', icon: <GitHubIcon /> },
  { name: 'LinkedIn', key: 'linkedin', icon: <LinkedInIcon /> },
  { name: 'Twitter', key: 'twitter', icon: <TwitterIcon /> },
  { name: 'YouTube', key: 'youtube', icon: <YouTubeIcon /> },
  { name: 'WhatsApp', key: 'whatsapp', icon: <WhatsAppIcon /> },
];

export default function ContactTab({ avatar, fullName }) {
  const [isEditing, setIsEditing] = useState(true);
  const [socialLinks, setSocialLinks] = useState({
    github: '',
    linkedin: '',
    twitter: '',
    youtube: '',
    whatsapp: '',
  });

  useEffect(() => {
    setIsEditing(true);
  }, []);

  const handleLinkChange = (platform, link) => {
    setSocialLinks((prevLinks) => ({
      ...prevLinks,
      [platform]: link,
    }));
  };

  const handleSave = () => {
    // add logic here to save socialLinks data
  };

  return (
    <Card sx={{ position: 'relative', boxShadow: 'lg', margin: 'auto', border: '2px solid #000', display: 'flex', transition: 'transform 0.4s', '&:hover': { transform: 'scale(1.03)' }, transformOrigin: 'center' }}>
      <CardContent sx={{ alignItems: 'center', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
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
      </CardContent>
      {isEditing && (
        <Box
          style={{
            position: 'absolute',
            borderRadius: '6px',
            width: '100%',
            height: '100%',
            
            zIndex: -1,
            
          }}
        />
      )}
      <CardActions sx={{ flexDirection: 'column', alignItems: 'center', mt: 'auto' }}>
        <Button variant="outlined" onClick={handleSave}>
          Save
        </Button>
      </CardActions>
    </Card>
  );
}

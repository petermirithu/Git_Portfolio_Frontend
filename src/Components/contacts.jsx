import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import SvgIcon from '@mui/material/SvgIcon';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { Box, Modal, Backdrop, Fade } from '@mui/material';

const socialPlatforms = [
  { name: 'GitHub', key: 'github', icon: <GitHubIcon /> },
  { name: 'LinkedIn', key: 'linkedin', icon: <LinkedInIcon /> },
  { name: 'Twitter', key: 'twitter', icon: <TwitterIcon /> },
  { name: 'YouTube', key: 'youtube', icon: <YouTubeIcon /> },
  { name: 'WhatsApp', key: 'whatsapp', icon: <WhatsAppIcon /> },
];

export default function ContactTab({ avatar, fullName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState({
    github: '',
    linkedin: '',
    twitter: '',
    youtube: '',
    whatsapp: '',
  });
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLinkChange = (platform, link) => {
    setSocialLinks((prevLinks) => ({
      ...prevLinks,
      [platform]: link,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // add logic here to save socialLinks data
    setIsEditing(false);
  };

  const handleSendMessageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSendMessage = () => {
    // add logic here to handle sending the message
    console.log(`Email: ${email}, Message: ${message}`);
    handleCloseModal();
  };

  return (
    <Card sx={{ position: 'relative', boxShadow: 'lg', margin: 'auto', border: '2px solid #000', display: 'flex', transition: 'transform 0.4s', '&:hover': { transform: 'scale(1.03)' }, transformOrigin: 'center' }}>
      <CardContent sx={{ alignItems: 'center', textAlign: 'center', display: 'flex', flexDirection: 'column', }}>
        <Avatar src={avatar} sx={{ '--Avatar-size': '4rem' }} />
        <Typography level="title-lg">{fullName}</Typography>
        <Typography level="body-sm" sx={{ maxWidth: '24ch', mb: 2 }}>
          Hello, this is my Contact card. Feel free to connect with me!
        </Typography>
        {!isEditing ? (
          <ButtonGroup orientation="horizontal" sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            {socialPlatforms.map((platform) => (
              <Tooltip key={platform.key} title={platform.name} arrow>
                <IconButton onClick={() => window.open(socialLinks[platform.key], '_blank')}>
                  {platform.icon}
                </IconButton>
              </Tooltip>
            ))}
          </ButtonGroup>
        ) : (
          <ButtonGroup orientation="vertical" sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
        )}
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={isEditing ? handleSave : handleEditClick}>
          {isEditing ? 'Save' : 'Edit'}
        </Button>
        <Button variant="outlined" onClick={handleSendMessageClick}>
          Send Message
        </Button>
      </CardActions>
      {isEditing && (
        <Box
          style={{
            position: 'absolute',
            borderRadius: '6px',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
            zIndex: -1,
            backdropFilter: 'blur(5px)',
          }}
        />
      )}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '8px' }}>
            <Typography variant="h5" mb={2}>Send a Message</Typography>
            <TextField label="Email" fullWidth sx={{ mb: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Message" multiline rows={4} fullWidth sx={{ mb: 2 }} value={message} onChange={(e) => setMessage(e.target.value)} />
            <Button variant="outlined" onClick={handleSendMessage}>
              Send
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Card>
  );
}

import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import { ApartmentOutlined, LocationOnOutlined, LinkOutlined, EmailOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { gitProfile } = useSelector((state) => state.userProfile);
  const { profile } = useSelector((state) => state.userProfile);

  console.log(gitProfile)

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#E5E4E2', padding: '16px' }}>

      <Avatar alt="Image"
        src={gitProfile.avatar_url} sx={{ width: 200, height: 200 }}
        style={{ marginLeft: "auto", marginRight: "auto" }} />

      <br />
      <br />
      <Typography variant="h4" component="h4">
        {gitProfile.name}
      </Typography>

      <Typography variant="h6" component="h6">
        {gitProfile.login}
      </Typography>

      <br />
      <Typography variant="body2">
        {gitProfile.bio}
      </Typography>

      <br />
      <div style={{ display: "flex", gap: "20px" }}>
        <Typography variant="body1">
          <b>Followers</b>: {gitProfile.followers}
        </Typography>

        <Typography variant="body1">
          <b>Followers</b>: {gitProfile.following}
        </Typography>
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <Typography variant="body1">
          <b>Public Repositories</b>: {gitProfile.public_repos}
        </Typography>
      </div>

      <br/>
      <div style={{ display: "flex", gap: "5px" }}>
        <EmailOutlined className="icon" />
        <Typography variant="body2">
          {profile?.email || 'N/A'}
        </Typography>
      </div>

      <div style={{ display: "flex", gap: "5px" }}>
        <ApartmentOutlined className="icon" />
        <Typography variant="body2">
          {gitProfile?.company || 'N/A'}
        </Typography>
      </div>

      <div style={{ display: "flex", gap: "5px" }}>
        <LocationOnOutlined className="icon" />
        <Typography variant="body2">
          {gitProfile?.location || 'N/A'}
        </Typography>
      </div>

      <div style={{ display: "flex", gap: "5px" }}>
        <LinkOutlined className="icon" />
        <Link style={{ width: "100%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
          href={"sddfsfsd"} variant="body2" color="inherit" target="_parent">
          {gitProfile?.blog || 'N/A'}
        </Link>
      </div>

    </div>
  );
};

export default Sidebar;

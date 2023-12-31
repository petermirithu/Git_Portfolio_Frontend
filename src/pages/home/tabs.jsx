import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import MailIcon from '@mui/icons-material/Mail';
import GitHubIcon from '@mui/icons-material/GitHub';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Box from '@mui/material/Box';
import SkillsTab from '../../Components/skills';
import ContactTab from '../../Components/contacts';
import ExperienceTab from '../../Components/experience';
import ProjectsTab from '../../Components/projects';
import GitActivityTab from '../../Components/gitActivity';


export default function NavigationTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="40vh"
      
  
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="navigation tabs"
          textColor='inherit'          
        >
          <Tab icon={<CodeIcon />} label="Skills" />
          <Tab icon={<WorkIcon />} label="Projects" />
          <Tab icon={<MailIcon />} label="Contact" />
          <Tab icon={<ContactPhoneIcon />} label="Experience" />
          <Tab icon={<GitHubIcon />} label="Git Activity" />
        </Tabs>

        <Box minHeight="300px" overflow="hidden">
        {value === 0 && <SkillsTab />}
        {value === 1 && <ProjectsTab/> }
        {value === 2 && <ContactTab />}
        {value === 3 && <ExperienceTab />}

        {value === 4 && <GitActivityTab />}
        
      </Box>
    </Box>
    </>
  );
}
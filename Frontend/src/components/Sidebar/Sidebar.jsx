import { Box, Typography, List, ListItem, ListItemText, Divider, ListItemIcon, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  Article as ArticleIcon,
  Image as ImageIcon,
  CreditCard as CreditCardIcon,
  Settings as SettingsIcon,
  SupportAgent as SupportAgentIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useState } from 'react';

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const toggleSidebar = () => setOpen(!open);

  const listItemStyle = {
    textDecoration: 'none',
    color: 'inherit',
    mb: 2,
    borderRadius: 2,
    '&:hover': { backgroundColor: '#f5f5f5' },
  };

  const navigationItems = [
    { text: 'Generate Post', icon: <ArticleIcon />, path: '/generated' },
    { text: 'Generate Image', icon: <ImageIcon />, path: '/generate-image' },
    { text: 'Subscription Plan', icon: <CreditCardIcon />, path: '/payment' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    { text: 'Support', icon: <SupportAgentIcon />, path: '/support' },
    { text: 'Logout', icon: <LogoutIcon />, path: '/logout' },
  ];

  return (
    <Box
    sx={{
      p: 2,
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      width: open ? 200 : 60,
      transition: 'width 0.3s',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: open ? 'flex-start' : 'center',
      justifyContent: 'flex-start',
    }}
  >
  
      <List sx={{ mb: 2 }}>
        <ListItem sx={{ ...listItemStyle, justifyContent: open ? 'space-between' : 'center', width:'100%' }}>
          {open && (
            <ListItemText
              primary="Dashboard"
              primaryTypographyProps={{ fontWeight: 'bold', fontSize: 20 }}
            />
          )}
          <IconButton onClick={toggleSidebar}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </ListItem>

        {navigationItems.map((item, index) => (
          <ListItem button component={Link} to={item.path} sx={{...listItemStyle,
            justifyContent: open ? 'flex-start' : 'center',
            px: open ? 2 : 0, }} key={index}>
            <ListItemIcon  sx={{
          minWidth: 0, ml: 3,
          mr: open ? 2 : 'auto',
          justifyContent: 'center',
        }}>{item.icon}</ListItemIcon>

        {open && (
            <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 'bold' }} />
        )}
            </ListItem>
        
        ))}
      </List>

      <Divider sx={{ my: 2 }} />
    </Box>
  );
}

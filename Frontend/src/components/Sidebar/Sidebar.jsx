import { Box, Typography, List, ListItem, ListItemText, Divider, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import ImageIcon from '@mui/icons-material/Image';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LogoutIcon from '@mui/icons-material/Logout';
import userService from '../../services/getUser';
import { useEffect, useState } from 'react';
import getAuth from '../../Utility/auth';

export default function Sidebar() {
  const listItemStyle = {
    textDecoration: 'none',
    color: 'inherit',
    mb: 2,
    borderRadius: 2,
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  };
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = getAuth();
  const token = user.user_token;
  const id = user.user_id;

  console.log("id sidebar", id)


  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userRes = await  userService.getUser(id, token);
        console.log("userRes", userRes)
        setUsers(userRes|| []);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchHistory();
  }, [id]);

  return (
    <Box
      sx={{
        p: 2,
        minHeight: '100vh',
        width: 200,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <List sx={{ pl: 2 }}>
        <ListItem button component={Link} to="/dashboard" sx={listItemStyle}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            primaryTypographyProps={{ fontWeight: 'bold' }}
          />
        </ListItem>

        <Divider sx={{my: 3}}></Divider>
        <ListItem button component={Link} to="/generated" sx={listItemStyle}>
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText
            primary="Generate Post"
            primaryTypographyProps={{ fontWeight: 'bold' }}
          />
        </ListItem>

        <ListItem button component={Link} to="/generate-image" sx={listItemStyle}>
          <ListItemIcon>
            <ImageIcon />
          </ListItemIcon>
          <ListItemText
            primary="Generate Image"
            primaryTypographyProps={{ fontWeight: 'bold' }}
          />
        </ListItem>

        <ListItem button component={Link} to="/payment" sx={listItemStyle}>
          <ListItemIcon>
            <CreditCardIcon />
          </ListItemIcon>
          <ListItemText
            primary="Subscription Plan"
            primaryTypographyProps={{ fontWeight: 'bold' }}
          />
        </ListItem>

        <ListItem button component={Link} to="/settings" sx={listItemStyle}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            primary="Settings"
            primaryTypographyProps={{ fontWeight: 'bold' }}
          />
        </ListItem>

        <ListItem button component={Link} to="/support" sx={listItemStyle}>
          <ListItemIcon>
            <SupportAgentIcon />
          </ListItemIcon>
          <ListItemText
            primary="Support"
            primaryTypographyProps={{ fontWeight: 'bold' }}
          />
        </ListItem>

        <ListItem button component={Link} to="/logout" sx={listItemStyle}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ fontWeight: 'bold' }}
          />
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body2" sx={{ pl: 2 }}>
        Usage Credits: 50<br />
        Remaining: 30
      </Typography>
    </Box>
  );
}

import React from "react";
import { Box, Paper, Typography} from '@mui/material';
import getAuth from "../../Utility/auth";


export default function Profile({ usageCredits, remainingCredits }) {

    const user = getAuth();
    const name = user.user_name;
    const email = user.user_email;

    return (
        <Paper elevation={3} sx={{p :4, borderRadius: 3, mb: 4, background: 'linear-gradient(135deg,rgb(239, 239, 239) 0%, #e0f7fa 100%)'}}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
                Profile
            </Typography>
            <Typography variant="body1">Name: {name}</Typography>
      <Typography variant="body1">Email: {email}</Typography>
      <Typography variant="body1">Usage Credits: {usageCredits}</Typography>
      <Typography variant="body1">Remaining Credits: {remainingCredits}</Typography>
        </Paper>
    )
}
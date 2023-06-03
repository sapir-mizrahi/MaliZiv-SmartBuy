import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    Alert, MenuItem, Autocomplete
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import './SignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CheckIcon from "@mui/icons-material/Check";
import { login, signUp } from './Utils/Rest';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    const [needslogin, setNeedslogin] = useState(false)
    const [holidayValue, setHolidayValue] = React.useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let userData = {
            name: data.get("name"),
            email: data.get('email'),
            password: data.get('password'),
            country: data.get("country"),
            religion: holidayValue
        }
        console.log(userData);
        const res = await login(userData.email, userData.password);
        if (res.data.message === 'user not found') {
            const response = await signUp(userData)
            if (response.status === 200) {
                navigate('/shoppingList');
                localStorage.setItem("user", response.data)
            }
        }
        else
            if (res.data.message === "user found") { setNeedslogin(true) }
    };

    const holidaysNames = [
        "public_holiday",
        "observance",
        "national_holiday",
        "federal_holiday",
        "season",
        "state_holiday",
        "optional_holiday",
        "clock_change",
        "local_holiday",
        "united_nations_observance",
        "observance_christian",
        "bank_holiday",
        "common_local_holiday",
        "national_holiday_christian",
        "christian",
        "observance_hebrew",
        "jewish_holiday",
        "muslim",
        "hindu_holiday",
        "restricted_holiday",
        "official_holiday",
        "national_holiday_orthodox",
        "local_observance"
    ];
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    {needslogin && <Alert severity="warning">We know you, you just need a login</Alert>}

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="name"
                                    name="name"
                                    autoComplete="name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="country"
                                    name="country"
                                    required
                                    fullWidth
                                    id="country"
                                    label="country"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>

                                <Autocomplete
                                    sx={{ m: 1, width: 500 }}
                                    multiple
                                    options={holidaysNames}
                                    getOptionLabel={(option) => option}
                                    disableCloseOnSelect
                                    onChange={(event, value) => setHolidayValue(value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Religion*"
                                            placeholder="Religion"
                                        />
                                    )}
                                    renderOption={(props, option, { selected }) => (
                                        <MenuItem
                                            {...props}
                                            key={option}
                                            value={option}
                                            sx={{ justifyContent: "space-between" }}
                                        >
                                            {option}
                                            {selected ? <CheckIcon color="info" /> : null}
                                            {selected ? () => setHolidayValue([holidayValue, option]) : ''}
                                        </MenuItem>
                                    )}
                                />

                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}
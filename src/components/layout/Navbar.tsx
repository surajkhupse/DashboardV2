import React from "react";
import { Box, AppBar, Typography, Stack, Link, Breadcrumbs, TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

type NavbarProps = {
  onSearchChange: (query: string) => void;
};


const Navbar: React.FC<NavbarProps> = ({onSearchChange}) => {

    const handleClick = (event: any) => {
        event.preventDefault();
        console.log("Breadcrumb link clicked:", event.currentTarget.href);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#ffffff", boxShadow: 'none' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mx={3} py={1}>
                    {/* Breadcrumbs on the left */}
                    <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ fontSize: "14px" }}>
                        <Link underline="hover" color="inherit" href="/" onClick={handleClick}>
                            Home
                        </Link>
                        <Typography variant="body2" sx={{ color: 'text.primary' }}>
                            Dashboard V2
                        </Typography>
                    </Breadcrumbs>

                    {/* Search on the right */}
                    <TextField
                        variant="outlined"
                        placeholder="Search anything..."
                        size="small"
                        sx={{
                            width: 500,
                            backgroundColor: '#f0f5f9',
                            borderRadius: '8px',
                                '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                            },
                        }}
                           onChange={(e) => onSearchChange(e.target.value)} 
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
            </AppBar>
        </Box>
    );
};

export default Navbar;

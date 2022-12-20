import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { Container } from '@mui/system';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '52ch',
    },
  },
}));

export default function TopBar() {

  const [searchQuery, setSearchQuery] = useState("")
  const [username, setUsername] = useState("")

  useEffect(() => {
    async function getUsername () {
      const response = await fetch("http://88.198.184.61:2345/user", {
        credentials: 'include'
      });
      const data = await response.json();
      
      console.log(data)
      if (response.status !== 200) {
        console.log("ERROR")
      } else {
        setUsername(data)
      }

    }


  }, [])

  function handleSearch() {
    window.location.href = `http://88.198.184.61:4000/stock/${searchQuery}`
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar>
          <Container style={{display:'flex'}}>
          <Search onChange={(e) => setSearchQuery(e.target.value)}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for a ticker"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Button variant="contained" style={{marginLeft: "10px"}} sx={{ backgroundColor: 'primary.main'}} onClick={handleSearch}>Search</Button>
          </Container>

          <Button variant="contained" style={{ marginLeft: "10px"}} sx={{ backgroundColor: 'primary.main'}} onClick={() => {window.location.href = `http://88.198.184.61:4000/signup`}}>Signup</Button>
          <Button variant="contained" style={{marginLeft: "10px"}} sx={{ backgroundColor: 'primary.main'}} onClick={() => {window.location.href = `http://88.198.184.61:4000/login`}}>Login</Button>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            align="end"
          >
            Hello {username ? username : "UNDEFINED"}
          </Typography> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
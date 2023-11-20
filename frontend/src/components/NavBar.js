import {
    AppBar,
    Button,
    Drawer,
    IconButton,
    Toolbar,
    Typography,
  } from "@mui/material";
  import NavListDrawer from "./NavListDrawer";
  import { useState } from "react";
  
  import MenuIcon from "@mui/icons-material/Menu";
  import { Box } from "@mui/system";
  
  import { NavLink } from "react-router-dom";
  
   function NavBar({ navArrayLinks }) {
    const [open, setOpen] = useState(false);
  
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              size="large"
              onClick={() => setOpen(true)}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h3"
              sx={{ flexGrow: 1 }}
            >
              Blamsh
            </Typography>
  
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navArrayLinks.map((item) => (
                <Button
                  color="inherit"
                  key={item.title}
                  component={NavLink}
                  to={item.path}
                >
                  {item.title}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
  
        <Drawer
          open={open}
          anchor="left"
          onClose={() => setOpen(false)}
          
        >
          <NavListDrawer
            navArrayLinks={navArrayLinks}
            NavLink={NavLink}
            setOpen={setOpen}
          />
        </Drawer>
      </>
    );
  }
  export default NavBar;

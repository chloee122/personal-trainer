import { useState } from "react";
import "./App.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SideMenu from "./components/SideMenu";
import { Outlet } from "react-router-dom";

function App() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = (isMenuOpen) => () => {
    setIsSideMenuOpen(isMenuOpen);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleSideMenu(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Personal Trainer</Typography>
        </Toolbar>
      </AppBar>
      <SideMenu
        isSideMenuOpen={isSideMenuOpen}
        toggleSideMenu={toggleSideMenu}
      />
      <Outlet />
    </>
  );
}

export default App;

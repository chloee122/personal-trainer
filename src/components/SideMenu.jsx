import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import { ListItemIcon } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SideMenu({ isSideMenuOpen, toggleSideMenu }) {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  const sideMenuItems = [
    { label: "Customers", icon: <PeopleAltIcon />, path: "/" },
    { label: "Trainings", icon: <FitnessCenterIcon />, path: "/trainings" },
    { label: "Calendar", icon: <CalendarMonthIcon />, path: "/calendar" },
    { label: "Statistics", icon: <InsertChartIcon />, path: "/statistics" },
  ];

  const MenuList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleSideMenu(false)}
    >
      <List>
        {sideMenuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton onClick={() => handleClick(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer open={isSideMenuOpen} onClose={toggleSideMenu(false)}>
      {MenuList}
    </Drawer>
  );
}

export default SideMenu;

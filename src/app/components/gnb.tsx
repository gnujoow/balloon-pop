import { FC } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton } from "@mui/material";

interface GlobalNavBarProps {
  isDarkMode: boolean;
  onToggleDarkMode: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const GlobalNavBar: FC<GlobalNavBarProps> = ({
  isDarkMode,
  onToggleDarkMode,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={onToggleDarkMode}>
            {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Balloon Pop
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default GlobalNavBar;

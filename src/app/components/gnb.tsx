import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LightModeIcon from "@mui/icons-material/LightMode";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

GlobalNavBar;
export default function GlobalNavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <FormGroup>
            <FormControlLabel
              control={<Switch defaultChecked color="secondary" />}
              label={
                <LightModeIcon />
                // <DarkModeIcon />
              }
            />
          </FormGroup>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Balloon Pop
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

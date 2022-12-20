import React from "react";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Switches({changeSwitch}) {
  const [state, setState] = React.useState({
    checkedA: false
  });
  const [ticked, setTicked] = useState(false)

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
    setTicked(!ticked);
    changeSwitch(!ticked)
  };

  const theme = createTheme({
    components: {
      MuiSwitch: {
        styleOverrides: {

          switchBase: {
            // Controls default (unchecked) color for the thumb
            color: "green"
          },


          colorPrimary: {
            "&.Mui-checked": {
              // Controls checked color for the thumb
              color: "red"
            }
          },
          track: {
            // Controls default (unchecked) color for the track
            opacity: 0.7,
            backgroundColor: "green",
            ".Mui-checked.Mui-checked + &": {
              // Controls checked color for the track
              opacity: 0.7,
              backgroundColor: "red"
            }
          }
        }
      }
    }
  })

  return (<>
      <Grid component="label" container alignItems="center" justifyContent="center" spacing={1}>
        <Grid item>Buy</Grid>
        <Grid item>
          <ThemeProvider theme={theme}>
            <Switch
              size="medium"
              checked={state.checkedA}
              onChange={handleChange("checkedA")}
              value="checkedA"
            />
          </ThemeProvider>
        </Grid>
        <Grid item>Sell</Grid>
      </Grid>
    </>
  );
}

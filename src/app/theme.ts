import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      // Aria
      main: '#00abe6',

      // Amedia
      // main: '#000',

      // Borson
      // main: 'blue',
      
      contrastText: '#ffffff'
    },
    secondary: {
      // Aria
      main: '#ED32A8'

      // Amedia
      // main: '#EC0086'

      // Borson
      // main: '#ED32A8',

      // main: '#42bfc4'
    }
  },
  overrides: {
    MuiTouchRipple: {
      childPulsate: {
        // Aria
        backgroundColor: "#ED32A8"

        // Amedia
        // backgroundColor: "#EC0086"

        // Borson
        // backgroundColor: '#42bfc4'
      }
    },
    MuiButton: {
      outlined: {
        color: "#000"
      }
    }
  },
  typography: {
    body1: {
      fontSize: "1rem"
    },
    body2: {
      fontSize: "1rem"
    },
    display1: {
      fontSize: "1.8rem",
      color: "rgba(0, 0, 0, 0.87)"
    },
    display2: {
      fontSize: "1.15rem",
      color: "rgba(0, 0, 0, 0.87)",
      fontWeight: 500
    }
  }
});
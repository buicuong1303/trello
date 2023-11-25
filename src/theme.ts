import { teal, deepOrange, cyan, orange } from '@mui/material/colors'
//prevent dark mode SSG flicking
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      }
    }
  }
  // spacing: (factor: number) => `${0.25 * factor}rem`
})
export default theme

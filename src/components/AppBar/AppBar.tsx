import ModeSelect from '../ModeSelect'
import Box from '@mui/material/Box'
function AppBar(props) {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.light',
        width: '100%',
        height: '48px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <ModeSelect />
    </Box>
  )
}

export default AppBar

import DarkModeIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeIcon from '@mui/icons-material/LightMode'
import SystemModeIcon from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useColorScheme } from '@mui/material/styles'
function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event: SelectChangeEvent) => {
    const selectedMode: any = event.target.value
    setMode(selectedMode)
    // event.
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
      <InputLabel id='label-select-dark-light-mode'>Age</InputLabel>
      <Select
        labelId='label-select-dark-light-mode'
        id='select-dark-light-mode'
        value={mode}
        label='Mode'
        onChange={handleChange}
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        <MenuItem value={'light'}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LightModeIcon fontSize='small' />
            Light
          </div>
        </MenuItem>
        <MenuItem value={'dark'}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <DarkModeIcon fontSize='small' />
            Dark
          </Box>
        </MenuItem>
        <MenuItem value={'system'}>
          <Box
            //Dung sx có thể access theme(theme.breakpoint), responsive, access to child component, short-hand, nested style
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <SystemModeIcon fontSize='small' />
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

function App() {
  return (
    <Container
      disableGutters //disable padding
      maxWidth={false} //disable margin
      sx={{
        height: '100vh' // dù màn hình nào thì cũng fit chiều cao, không xuất hiện thanh scroll dọc
      }}
    >
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
      <Box
        sx={{
          backgroundColor: 'primary.dark',
          width: '100%',
          height: '58px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        Board Bar
      </Box>
      <Box
        sx={{
          backgroundColor: 'primary.main',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          height: 'calc(100vh - 48px - 58px)'
        }}
      >
        Board Content
      </Box>
    </Container>
  )
}

export default App

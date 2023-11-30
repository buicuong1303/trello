import DarkModeIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeIcon from '@mui/icons-material/LightMode'
import SystemModeIcon from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'
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
    <FormControl sx={{ minWidth: 120 }} size='small'>
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <LightModeIcon fontSize='small' />
            Light
          </Box>
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

export default ModeSelect

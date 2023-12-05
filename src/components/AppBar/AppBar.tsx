import ModeSelect from '../ModeSelect'
import Box from '@mui/material/Box'
import AppIcons from '@mui/icons-material/Apps'
import SvgIcon from '@mui/material/SvgIcon'
//import svg như component, nhớ là phải có ?react phía sau
import TrelloIcon from '~/assets/trello.svg?react'
import Typography from '@mui/material/Typography'
import WorkSpaces from './Menu/WorkSpaces'
import Recent from './Menu/Recent'
import Starred from './Menu/Starred'
import Templates from './Menu/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import Tooltip from '@mui/material/Tooltip'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Profile from './Menu/Profile'
import { ChangeEvent, useState } from 'react'
function AppBar() {
  const [searchValue, setSearchValue] = useState('')
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: '58px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflowX: 'auto',
        gap: 2,
        paddingX: 2,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppIcons sx={{ color: 'white' }} />
        {/* <img src={TrelloIcon} /> */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon fontSize='small' component={TrelloIcon} inheritViewBox sx={{ color: 'white' }} />
          <Typography variant='subtitle1' sx={{ fontSize: '1.rem', fontWeight: 'bold', color: 'white' }}>
            Trello
          </Typography>
        </Box>
        <WorkSpaces />
        <Recent />
        <Starred />
        <Templates />
        <Button
          variant='outlined'
          sx={{ color: 'white', border: 'none', '&:hover': { border: 'none' } }}
          startIcon={<LibraryAddIcon />}
        >
          Create
        </Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          size='small'
          id='outlined-search'
          label='Search...'
          type='text'
          value={searchValue}
          onChange={handleSearchChange}
          sx={{
            minWidth: 120,
            maxWidth: 170,
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white'
              },
              '&:hover fieldset': {
                borderColor: 'white'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white'
              }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
            endAdornment: searchValue && (
              <CloseIcon
                fontSize='small'
                sx={{ color: 'white', cursor: 'pointer' }}
                onClick={() => setSearchValue('')}
              />
            )
          }}
        />
        <ModeSelect />
        <Tooltip title='Notification'>
          <Badge color='warning' variant='dot' sx={{ cursor: 'pointer' }}>
            <NotificationIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>
        <Tooltip title='Help'>
          <Badge color='secondary' variant='dot' sx={{ cursor: 'pointer' }}>
            <HelpOutlineIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar

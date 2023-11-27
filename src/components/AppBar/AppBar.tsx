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
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Profile from './Menu/Profile'
function AppBar() {
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: '58px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppIcons sx={{ color: 'primary.main' }} />
        {/* <img src={TrelloIcon} /> */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'primary.main' }} />
          <Typography variant='subtitle1' sx={{ fontSize: '1.rem', fontWeight: 'bold', color: 'primary.main' }}>
            Trello
          </Typography>
        </Box>
        <WorkSpaces />
        <Recent />
        <Starred />
        <Templates />
        <Button variant='outlined'>Create</Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField size='small' id='outlined-search' label='Search...' type='search' />
        <ModeSelect />
        <Tooltip title='Notification'>
          <Badge color='secondary' variant='dot' sx={{ cursor: 'pointer' }}>
            <NotificationIcon />
          </Badge>
        </Tooltip>
        <Tooltip title='Help'>
          <Badge color='secondary' variant='dot' sx={{ cursor: 'pointer' }}>
            <HelpOutlineIcon />
          </Badge>
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar

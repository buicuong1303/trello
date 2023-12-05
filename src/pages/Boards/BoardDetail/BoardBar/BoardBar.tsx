import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import AvatarGroup from '@mui/material/AvatarGroup'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import Tooltip from '@mui/material/Tooltip'
function BoardBar(props) {
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflowX: 'auto',
        gap: 2,
        borderBottom: '1px solid #fff',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#30495e' : '#1976d2')
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          icon={<DashboardIcon />}
          label='acb'
          clickable
          sx={{
            color: 'white',
            bgcolor: 'transparent',
            border: 'none',
            paddingX: '5px',
            borderRadius: '4px',
            '.MuiSvgIcon-root': {
              color: 'white'
            },
            '&:hover': {
              bgColor: 'primary.50'
            }
          }}
        />
        <Chip
          icon={<VpnLockIcon />}
          label='Private/public workspace'
          clickable
          sx={{
            color: 'white',
            bgcolor: 'transparent',
            border: 'none',
            paddingX: '5px',
            borderRadius: '4px',
            '.MuiSvgIcon-root': {
              color: 'white'
            },
            '&:hover': {
              bgColor: 'primary.50'
            }
          }}
        />
        <Chip
          icon={<AddToDriveIcon />}
          label='Add to drive'
          clickable
          sx={{
            color: 'white',
            bgcolor: 'transparent',
            border: 'none',
            paddingX: '5px',
            borderRadius: '4px',
            '.MuiSvgIcon-root': {
              color: 'white'
            },
            '&:hover': {
              bgColor: 'primary.50'
            }
          }}
        />

        <Chip
          icon={<BoltIcon />}
          label='Automation'
          clickable
          sx={{
            color: 'white',
            bgcolor: 'transparent',
            border: 'none',
            paddingX: '5px',
            borderRadius: '4px',
            '.MuiSvgIcon-root': {
              color: 'white'
            },
            '&:hover': {
              bgColor: 'primary.50'
            }
          }}
        />
        <Chip
          icon={<FilterListIcon />}
          label='Filters'
          clickable
          sx={{
            color: 'white',
            bgcolor: 'transparent',
            border: 'none',
            paddingX: '5px',
            borderRadius: '4px',
            '.MuiSvgIcon-root': {
              color: 'white'
            },
            '&:hover': {
              bgColor: 'primary.50'
            }
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white' } }}
          variant='outlined'
          startIcon={<PersonAddIcon />}
        >
          Invite
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: '30px',
              height: '30px',
              fontSize: '16px',
              border: 'none'
            }
          }}
        >
          <Tooltip title='cuongbq'>
            <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
          </Tooltip>
          <Tooltip title='cuongbq'>
            <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
          </Tooltip>
          <Tooltip title='cuongbq'>
            <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
          </Tooltip>
          <Tooltip title='cuongbq'>
            <Avatar alt='Agnes Walker' src='/static/images/avatar/4.jpg' />
          </Tooltip>
          <Tooltip title='cuongbq'>
            <Avatar alt='Trevor Henderson' src='/static/images/avatar/5.jpg' />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar

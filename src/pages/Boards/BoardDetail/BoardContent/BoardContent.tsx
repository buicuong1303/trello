import Box from '@mui/material/Box'
import ListColumns from './ListColumns'
import { BOARD_CONTENT_HEIGHT } from '~/theme'

function BoardContent() {
  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#30495e' : '#1976d2'),
        width: '100%',
        display: 'flex',
        height: BOARD_CONTENT_HEIGHT,
        // trick wrap content bằng 1 thẻ box, sau đó thêm padding => thanh scroll sẽ k bị sát đáy
        p: '10px 0'
      }}
    >
      <ListColumns />
    </Box>
  )
}

export default BoardContent

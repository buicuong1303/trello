import Box from '@mui/material/Box'

function BoardContent(props) {
  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#30495e' : '#1976d2'),
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        height: 'calc(100vh - 58px - 60px)'
      }}
    >
      Board Content
    </Box>
  )
}

export default BoardContent

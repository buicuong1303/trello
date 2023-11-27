import Box from '@mui/material/Box'

function BoardContent(props) {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
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

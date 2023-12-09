import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import Column from './Column'

function ListColumns() {
  return (
    <Box
      sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        display: 'flex',
        // khoản trống thanh scroll phía dưới so với lề trái phải
        '&::-webkit-scrollbar-track': {
          m: 2
        }
      }}
    >
      {/* Box column */}
      <Column />
      <Column />
      {/* Add new Column */}
      <Box
        sx={{
          minWidth: '200px',
          maxWidth: '200px',
          bgcolor: '#ffffff3d',
          mx: 2,
          borderRadius: '6px',
          height: 'fit-content'
        }}
      >
        <Button
          sx={{ color: 'white', width: '100%', justifyContent: 'flex-start', pl: 2.5, py: 1 }}
          startIcon={<NoteAddIcon />}
        >
          Add new column
        </Button>
      </Box>
      {/* Box column */}
    </Box>
  )
}

export default ListColumns

import Box from '@mui/material/Box'
import Card from './Card'
import { BOARD_CONTENT_HEIGHT, COLUMN_FOOTER_HEIGHT, COLUMN_HEADER_HEIGHT } from '~/theme'
function ListCards() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        p: '0 5px',
        // add margin scrollbar
        m: '0 5px',
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: (theme) =>
          `calc(${BOARD_CONTENT_HEIGHT} - ${theme.spacing(5)} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`,
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ced0da',
          borderRadius: '8px'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#bfc2cf'
        }
      }}
    >
      <Card />
      <Card temporaryHideMedia />
    </Box>
  )
}

export default ListCards

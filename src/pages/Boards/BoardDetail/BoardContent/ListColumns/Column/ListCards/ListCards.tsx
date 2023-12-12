import Box from '@mui/material/Box'
import Card from './Card'
import { BOARD_CONTENT_HEIGHT, COLUMN_FOOTER_HEIGHT, COLUMN_HEADER_HEIGHT } from '~/theme'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
type Props = {
  cards: Array<any>
}
function ListCards({ cards }: Props) {
  return (
    <SortableContext items={cards.map((item) => item._id)} strategy={verticalListSortingStrategy}>
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
        {cards?.map((card) => <Card key={card._id} card={card} />)}
      </Box>
    </SortableContext>
  )
}

export default ListCards

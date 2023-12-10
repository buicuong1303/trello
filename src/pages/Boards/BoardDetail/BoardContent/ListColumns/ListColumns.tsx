import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import Column from './Column'
type Props = {
  columns: Array<any>
}
function ListColumns({ columns }: Props) {
  return (
    // Thằng sortable context yêu cầu đầu vào là một mảng các giá trị nguyên thủy ex: [1,2,3], không nhận array object. Nếu
    // không đúng thì kéo thả sẽ không có animation
    <SortableContext items={columns.map((item) => item._id)} strategy={horizontalListSortingStrategy}>
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
        {columns?.map((column) => <Column key={column._id} column={column} />)}
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
    </SortableContext>
  )
}

export default ListColumns

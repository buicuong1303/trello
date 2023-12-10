import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import ListColumns from './ListColumns'
import { DndContext, PointerSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { BOARD_CONTENT_HEIGHT } from '~/theme'
import { mapOrder } from '~/utils/sorts'
type Props = {
  board: any
}
function BoardContent({ board }: Props) {
  const [orderedColumns, setOrderedColumns] = useState<Array<any>>([])

  const handleDragEnd = (event: any) => {
    console.log(event)
    const { active, over } = event
    // Trường hợp kéo ra ngoài, k xác định dc
    if (!over) return

    // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu thì mới xử lý
    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id)
      const newIndex = orderedColumns.findIndex((c) => c._id === over.id)
      // Dùng arrayMove để sắp xếp lại columns
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // TODO call API
      // const dndOrderedColumnIds = dndOrderedColumns.map(c => c._id)

      setOrderedColumns(dndOrderedColumns)
    }
  }

  const pointerSensor = useSensor(PointerSensor, {
    // Require the mouse to move by 10 pixels before activating, fix when click to trigger event
    activationConstraint: {
      distance: 10
    }
  })
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating, fix when click to trigger event
    activationConstraint: {
      distance: 10
    }
  })
  const touchSensor = useSensor(TouchSensor, {
    // Nhấn giữ 250ms thì mới kích hoạt event
    activationConstraint: {
      delay: 250,
      tolerance: 500
    }
  })
  // const sensors = useSensors(pointerSensor)

  // Tối ưu trên mobile, để kéo thả mượt hơn
  const sensors = useSensors(mouseSensor, touchSensor)

  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumns(orderedColumns)
  }, [board])
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
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
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent

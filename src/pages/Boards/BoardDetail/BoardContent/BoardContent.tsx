import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import ListColumns from './ListColumns'
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { BOARD_CONTENT_HEIGHT } from '~/theme'
import Column from './ListColumns/Column'
import Card from './ListColumns/Column/ListCards/Card'
import { mapOrder } from '~/utils/sorts'
import cloneDeep from 'lodash/cloneDeep'
type Props = {
  board: any
}
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
function BoardContent({ board }: Props) {
  const [orderedColumns, setOrderedColumns] = useState<Array<any>>([])
  // Tại 1 thời điểm chỉ có thể kéo card hoặc column
  const [activeDragItemId, setActiveDragItemId] = useState<any>(null)
  const [activeDragItemType, setActiveDragItemType] = useState<any>(null)
  const [activeDragItemData, setActiveDragItemData] = useState<any>(null)

  // Tìm column theo cardId
  const findColumnByCardId = (cardId: string) => {
    // Đoạn này cần lưu ý, nên dùng c.cards thay vì c.cardOrderIds vì ở bước handleDragOver chúng ta sẽ làm dữ liệu cho cards hoàn chỉnh trước rồi mới tạo ra cardOrderIds mới
    return orderedColumns.find((column: any) => column.cards?.map((card: any) => card._id)?.includes(cardId))
  }

  const handleDragStart = (event: any) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)
  }

  const handleDragOver = (event: any) => {
    // Không làm gì khi kéo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    const { active, over } = event
    // Trường hợp kéo ra ngoài, k xác định dc
    if (!active || !over) return

    // activeDraggingCard Card đang kéo
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    const {
      id: overCardId,
      data: { current: overCardData }
    } = over

    // tìm 2 column của 2 card
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    console.log({ activeColumn, overColumn })
    if (!activeColumn || !overColumn) return
    // xủ lý logic ở đây chỉ khi kéo card qua 2 column khác nhau, còn nếu kéo card trong chính column ban đầu của nó thì không làm gì
    // vì đay đang là đoạn xử lý lúc kéo, còn xử lý lúc kéo xong xuôi thì nó là vấn đề khác ở handleDragend
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns((prevColumns) => {
        // tìm vị trí (index) của cái overCard trong column đích (nơi mà activeCard sắp đc thả)
        const overCardIndex = overColumn?.cards?.findIndex((c: any) => c._id === overCardId)
        let newCardIndex
        // logic tính toán "cardIndex mới" (tren hay dưới overCard)
        const isBelowOverItem =
          active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.cards.length + 1
        console.log({ overCardId })
        console.log({ overCardIndex })
        console.log({ newCardIndex })
        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find((c: any) => c._id === activeColumn._id)
        const nextOverColumn = nextColumns.find((c: any) => c._id === overColumn._id)
        if (nextActiveColumn) {
          // Xóa card ở src column
          nextActiveColumn.cards = nextActiveColumn.cards.filter((c: any) => c._id !== activeDraggingCardId)
          // cập nhật lại cardOrderIds
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((c: any) => c._id)
        }
        if (nextOverColumn) {
          // kiểm tra xem card đag kéo có tồn tại ở dest column chưa, nếu có thì cần xóa
          nextOverColumn.cards = nextOverColumn.cards.filter((c: any) => c._id !== activeDraggingCardId)
          //Tiếp theo là thêm card đang kéo vào dest column, toSplice tương tự như splice nhưng sẽ tạo ra mảng mới
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
          // cập nhật lại cardOrderIds
          nextActiveColumn.cardOrderIds = nextOverColumn.cards.map((c: any) => c._id)
        }
        return nextColumns
      })
    }
  }
  // Animation khi thả phần tử - Test bằng cách kéo thả xong thả trực tiếp và nhìn phần giữ chỗ overlay
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }
  const handleDragEnd = (event: any) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      return
    }
    const { active, over } = event
    // Trường hợp kéo ra ngoài, k xác định dc
    if (!active || !over) return

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
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
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
    <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDragStart={handleDragStart} sensors={sensors}>
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
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent

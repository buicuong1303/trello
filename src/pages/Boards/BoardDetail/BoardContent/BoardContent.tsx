import {
  DndContext,
  DragOverlay,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  defaultDropAnimationSideEffects,
  getFirstCollision,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import cloneDeep from 'lodash/cloneDeep'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BOARD_CONTENT_HEIGHT } from '~/theme'
import { mapOrder } from '~/utils/sorts'
import ListColumns from './ListColumns'
import Column from './ListColumns/Column'
import Card from './ListColumns/Column/ListCards/Card'
import _isEmpty from 'lodash/isEmpty'
import { generatePlaceholderCard } from '~/utils/helper'
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
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState<any>(null)

  // Điểm va chạm cuối cùng trước đó
  const lastOverId = useRef<any>(null)
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

    //Nếu là kéo card thì lưu lại column của card đang kéo
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
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
    const { id: overCardId } = over

    // tìm 2 column của 2 card
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    if (!activeColumn || !overColumn) return
    // xủ lý logic ở đây chỉ khi kéo card qua 2 column khác nhau, còn nếu kéo card trong chính column ban đầu của nó thì không làm gì
    // vì đay đang là đoạn xử lý lúc kéo, còn xử lý lúc kéo xong xuôi thì nó là vấn đề khác ở handleDragend
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenTwoColumns({
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      })
    }
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    // Trường hợp kéo ra ngoài, k xác định dc
    if (!active || !over) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // activeDraggingCard Card đang kéo
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      const { id: overCardId } = over

      // tìm 2 column của 2 card
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
      if (!activeColumn || !overColumn) return
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        //Kéo 2 card khác column, phải lưu lại column ban đầu để so sánh, k dùng activeColumn._id thì vì khi dragOver đã làm activeColum thay đổi
        moveCardBetweenTwoColumns({
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        })
      } else {
        //kéo thẻ card trong cùng 1 column

        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex((c: any) => c._id === activeDragItemId)
        const newCardIndex = overColumn?.cards?.findIndex((c: any) => c._id === overCardId)
        //Tương tự như kéo column trong board content
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard.cards, oldCardIndex, newCardIndex)
        setOrderedColumns((prevColumns: Array<any>) => {
          const nextColumns = cloneDeep(prevColumns)
          const targetColumn = nextColumns.find((column: any) => column._id === overColumn._id)
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map((card: any) => card._id)
          return nextColumns
        })
      }
    }
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu thì mới xử lý
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumns.findIndex((c) => c._id === active.id)
        const newColumnIndex = orderedColumns.findIndex((c) => c._id === over.id)
        // Dùng arrayMove để sắp xếp lại columns
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        // TODO call API
        // const dndOrderedColumnIds = dndOrderedColumns.map(c => c._id)

        setOrderedColumns(dndOrderedColumns)
      }
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
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
  const collisionDetectionStrategy = useCallback(
    (args: any) => {
      // Trường hợp kéo column thì dùng thuật toán closestCorners
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }
      // Tìm các điểm giao nhau, va chạm
      const pointerIntersections = pointerWithin(args)
      // Kéo ra ngoài khu vực kéo thả thì không làm gì

      if (!pointerIntersections.length) return

      ///
      // const intersections = !!pointerIntersections?.length ? pointerIntersections : rectIntersection(args)

      // Tìm overId đầu tiên trong mảng intersections ở trên
      let overId: any = getFirstCollision(pointerIntersections, 'id')
      if (overId) {
        // Nếu over là column, ta sẽ tìm tới card id gần nhất trong khu vực va chạm đó dựa vào thuật toán phát hiện va chạm closestCenter hoặc closestCorners
        const checkColumn = orderedColumns.find((column) => column._id === overId)
        if (checkColumn) {
          //console.log('overId before', overId) //column Id
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter((container: any) => {
              return container.id !== overId && checkColumn.cardOrderIds?.includes(container.id)
            })
          })[0]?.id
          //console.log('overId after', overId) //card id
        }
        lastOverId.current = overId
        return [{ id: overId }]
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType, orderedColumns]
  )
  const moveCardBetweenTwoColumns = ({
    overColumn,
    overCardId,
    over,
    active,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  }: any) => {
    setOrderedColumns((prevColumns) => {
      // tìm vị trí (index) của cái overCard trong column đích (nơi mà activeCard sắp đc thả)
      const overCardIndex = overColumn?.cards?.findIndex((c: any) => c._id === overCardId)
      let newCardIndex
      // logic tính toán "cardIndex mới" (tren hay dưới overCard)
      const isBelowOverItem =
        active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.cards.length + 1

      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn: any = nextColumns.find((c: any) => c._id === activeColumn._id)
      const nextOverColumn = nextColumns.find((c: any) => c._id === overColumn._id)
      //Column cũ
      if (nextActiveColumn) {
        // Xóa card ở src column
        nextActiveColumn.cards = nextActiveColumn.cards.filter((c: any) => c._id !== activeDraggingCardId)

        //Thêm placeholder card nếu column rỗng
        if (_isEmpty(nextActiveColumn.cards)) {
          const placeholderCard = generatePlaceholderCard(nextActiveColumn)
          nextActiveColumn.cards = [placeholderCard]
        }
        // cập nhật lại cardOrderIds
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((c: any) => c._id)
      }
      //Column mới
      if (nextOverColumn) {
        // kiểm tra xem card đag kéo có tồn tại ở dest column chưa, nếu có thì cần xóa
        nextOverColumn.cards = nextOverColumn.cards.filter((c: any) => c._id !== activeDraggingCardId)
        //  Cập nhật lại column id cho card
        activeDraggingCardData.columnId = nextOverColumn._id
        //Tiếp theo là thêm card đang kéo vào dest column, toSplice tương tự như splice nhưng sẽ tạo ra mảng mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
        //Xóa placeholder card
        nextOverColumn.cards = nextOverColumn.cards.filter((c: any) => !c.FE_PlaceholderCard)
        // cập nhật lại cardOrderIds
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map((c: any) => c._id)
      }
      return nextColumns
    })
  }

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

  // Tối ưu trên mobile, để kéo thả mượt hơn
  const sensors = useSensors(mouseSensor, touchSensor)

  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumns(orderedColumns)
  }, [board])
  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      sensors={sensors}
      //nếu dùng closestCorners sẽ bị bug flickering + sai lệch dữ liệu khi kéo card không dứt khoác
      // collisionDetection={closestCorners} // fix lỗi kẽo card có hình ảnh

      //Tự custom
      collisionDetection={collisionDetectionStrategy as any} // fix lỗi kẽo card có hình ảnh
    >
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#30495e' : '#1976d2'),
          width: '100%',
          height: BOARD_CONTENT_HEIGHT,
          // trick wrap content bằng 1 thẻ box, sau đó thêm padding => thanh scroll sẽ k bị sát đáy
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumns} />
        {/* thêm lớp phủ giữ vị trí khi kéo card hoặc column */}
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

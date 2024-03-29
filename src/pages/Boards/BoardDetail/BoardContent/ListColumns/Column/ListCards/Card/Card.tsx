import AttachmentIcon from '@mui/icons-material/Attachment'
import CommentIcon from '@mui/icons-material/Comment'
import GroupIcon from '@mui/icons-material/Group'
import Button from '@mui/material/Button'
import CardMui from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
type Props = {
  card: any
}
function Card({ card }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card }
  })
  const dndCardStyle = {
    // Dùng CSS.Translate để không bị zoom out/int card khi kéo thả
    transform: CSS.Translate.toString(transform),
    transition,
    border: isDragging ? '1xp solid #2ecc71' : undefined,
    opacity: isDragging ? '0.5' : undefined
    // touchAction: 'none'// Danh cho pointer sensor
  }

  const shouldShowCardActions = () => {
    return !!card?.memberIds?.length || !!card?.attachments?.length || !!card?.comments?.length
  }

  return (
    <CardMui
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0,0,0,0.22)',
        // mặc đinh card của material ui sẽ set overflow hidden => không xuất hiện thanh scroll
        overflow: card.FE_PlaceholderCard ? 'hidden' : 'unset',
        height: card.FE_PlaceholderCard ? '0px' : 'unset'
      }}
      ref={setNodeRef}
      style={dndCardStyle}
      {...attributes}
      {...listeners}
    >
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card.cover} />}
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>{card.title}</Typography>
      </CardContent>
      {shouldShowCardActions() && (
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          {!!card?.memberIds?.length && (
            <Button size='small' startIcon={<GroupIcon />}>
              {card.memberIds.length}
            </Button>
          )}
          {!!card?.attachments?.length && (
            <Button size='small' startIcon={<AttachmentIcon />}>
              {card.attachments.length}
            </Button>
          )}
          {!!card?.comments?.length && (
            <Button size='small' startIcon={<CommentIcon />}>
              {card.comments.length}
            </Button>
          )}
        </CardActions>
      )}
    </CardMui>
  )
}

export default Card

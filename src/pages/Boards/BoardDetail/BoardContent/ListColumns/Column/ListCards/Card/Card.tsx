import AttachmentIcon from '@mui/icons-material/Attachment'
import CommentIcon from '@mui/icons-material/Comment'
import GroupIcon from '@mui/icons-material/Group'
import Button from '@mui/material/Button'
import CardMui from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
type Props = {
  temporaryHideMedia?: boolean
}
function Card({ temporaryHideMedia }: Props) {
  if (temporaryHideMedia) {
    return (
      <CardMui
        sx={{
          cursor: 'pointer',
          boxShadow: '0 1px 1px rgba(0,0,0,0.22)',
          // mặc đinh card của material ui sẽ set overflow hidden => không xuất hiện thanh scroll
          overflow: 'unset'
        }}
      >
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>Lizard</Typography>
        </CardContent>
      </CardMui>
    )
  }
  return (
    <CardMui
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0,0,0,0.22)',
        // mặc đinh card của material ui sẽ set overflow hidden => không xuất hiện thanh scroll
        overflow: 'unset'
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image='https://mui.com/static/images/cards/contemplative-reptile.jpg'
        title='green iguana'
      />
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>Lizard</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button size='small' startIcon={<GroupIcon />}>
          20
        </Button>
        <Button size='small' startIcon={<AttachmentIcon />}>
          15
        </Button>
        <Button size='small' startIcon={<CommentIcon />}>
          10
        </Button>
      </CardActions>
    </CardMui>
  )
}

export default Card

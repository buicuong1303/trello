import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
function BoardDetail(props) {
  return (
    <Container
      disableGutters //disable padding
      maxWidth={false} //disable margin
      sx={{
        height: '100vh' // dù màn hình nào thì cũng fit chiều cao, không xuất hiện thanh scroll dọc
      }}
    >
      <AppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  )
}

export default BoardDetail

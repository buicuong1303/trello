import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
import { mockData } from '~/apis/mock-data'
function BoardDetail() {
  return (
    <Container
      disableGutters //disable padding
      maxWidth={false} //disable margin
      sx={{
        height: '100vh' // dù màn hình nào thì cũng fit chiều cao, không xuất hiện thanh scroll dọc
      }}
    >
      <AppBar />
      <BoardBar board={mockData.board} />
      <BoardContent board={mockData.board} />
    </Container>
  )
}

export default BoardDetail

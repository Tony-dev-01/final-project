import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Header from './components/Header';
import SidebarMenu from './components/SidebarMenu';
import Scoreboard from './components/Scoreboard';
import NewsDetails from './components/NewsDetails';
import Statistics from './components/Statistics';

const App = () => {
  return (
    <BrowserRouter>
    <Container>
      <SidebarContainer>
        <SidebarMenu />
      </SidebarContainer>
      <PageWrap>
        {/* <Header /> */}
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/news' element={<Scoreboard />} />
          <Route path='/news/:id' element={<NewsDetails />} />
          <Route path='/statistics' element={<Statistics/>} />
          <Route path='/' element={<Homepage />} />
          <Route path="*" element={<h1>404: Not Found!</h1>} />
        </Routes>
      </PageWrap>
    </Container>
    </BrowserRouter>
  );
}

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 90ch;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
`

const SidebarContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
`



export default App;

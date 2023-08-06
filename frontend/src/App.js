import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Header from './components/Header';
import SidebarMenu from './components/SidebarMenu';

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

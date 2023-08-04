import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Header from './components/Header';
import SidebarMenu from './components/SidebarMenu';

const App = () => {
  return (
    <BrowserRouter>
    <TopMenu>
    <Header />
    </TopMenu>
    <SidebarMenu />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path="*" element={<h1>404: Not Found!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

const TopMenu = styled.div`
  display: flex;
  justify-content: flex-end;
`

export default App;

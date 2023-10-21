import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import SidebarMenu from './components/SidebarMenu';
import Scoreboard from './components/Scoreboard';
import NewsDetails from './components/NewsDetails';
import Statistics from './components/Statistics';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import PickFavTeam from './components/PickFavTeam';
import Schedule from './components/Schedule';
import Standings from './components/Standings';
import { UserContext } from './context/UserContext';
import { useContext, useState } from 'react';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';

const App = () => {
  const {user} = useContext(UserContext);
  const [openMenu, setOpenMenu] = useState(false);

  const handleHover = () => {
    // Open menu
    setOpenMenu(true);
  }

  const handleMouseLeave = () => {
    // setTimeout(() => {
    //   console.log('close menu');
    //   setOpenMenu(false);
    // }, 800);
    // Close menu
    setOpenMenu(false);
  }

  return (
    <BrowserRouter>
    <Container>
      <SidebarContainer isOpen={openMenu} onMouseEnter={() => handleHover()} onMouseLeave={() => handleMouseLeave()}>
        <SidebarMenu openMenu={openMenu} />
      </SidebarContainer>
      <PageWrap isOpen={openMenu}>
        <Routes>
          <Route path='/' element={window.sessionStorage.getItem('user') === null ? <Homepage /> : <Dashboard />} />
          <Route path='/news' element={<Scoreboard />} />
          <Route path='/news/:id' element={<NewsDetails />} />
          <Route path='/statistics' element={<Statistics/>} />
          <Route path='/schedule' element={<Schedule/>} />
          <Route path='/standings' element={<Standings/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/create-account' element={<CreateAccount/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/profile/pick-team' element={<PickFavTeam />} />
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
  /* width: 85vw; */
  width: ${props => props.isOpen ? '85vw' : '95vw'};
  transition: all 0.8s ease;
  /* flex: 1; */
  /* height: 100%; */
`

const Container = styled.div`
  display: flex;
  width: 100vw;
  margin: auto;
  height: 100%; 
`

const SidebarContainer = styled.div`
  display: flex;
  /* width: 15vw; */
  width: ${props => props.isOpen ? '15vw' : '5vw'};
  transition: all 0.8s ease;
  height: 100vh;
`



export default App;

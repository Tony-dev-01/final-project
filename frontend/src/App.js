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
import { useContext } from 'react';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';

const App = () => {
  const {user} = useContext(UserContext);

  return (
    <BrowserRouter>
    <Container>
      <SidebarContainer>
        <SidebarMenu />
      </SidebarContainer>
      <PageWrap>
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
  width: 85vw;
  /* flex: 1; */
  /* height: 100%; */
`

const Container = styled.div`
  display: flex;
  width: 100vw;
  margin: auto;
  height: 100%; /* Why is it not working at 100%? */
`

const SidebarContainer = styled.div`
  display: flex;
  width: 15vw;
  height: 100vh;
`



export default App;

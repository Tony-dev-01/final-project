import { NavLink, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import logo from '../assets/logo-light.png'
import { IoAnalyticsSharp, IoHome, IoBarChart, IoCalendarClear, IoStatsChart, IoPodium, IoNewspaper, IoExitOutline } from "react-icons/io5";
import { COLORS } from "../Constants";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";


const SidebarMenu = () => {
    const navigate = useNavigate();
    const {user, setUser, disconnectUser} = useContext(UserContext);

    const handleLogOut = (e, disconnectUser) => {
        e.stopPropagation();
        disconnectUser();
        setUser();
        navigate('/');
    };

    const handleClickProfile = () => {
        navigate('/profile');
    };

    return (
        <Wrapper>
            <MenuContainer>
                <LogoContainer><NavLink to='/'><Logo src={logo} /></NavLink></LogoContainer>
                <MenuList>
                    {user ? <MenuLink to='/'><MenuItem><IoAnalyticsSharp />Dashboard</MenuItem></MenuLink> :
                    <MenuLink to='/'><MenuItem><IoHome />Home</MenuItem></MenuLink>}
                    {/* <MenuLink to='/scoreboard'><MenuItem><IoNewspaper />Scores</MenuItem></MenuLink> */}
                    <MenuLink to='/statistics'><MenuItem><IoStatsChart />Statistics</MenuItem></MenuLink>
                    <MenuLink to='/schedule'><MenuItem><IoCalendarClear />Schedule</MenuItem></MenuLink>
                    <MenuLink to='/standings'><MenuItem><IoPodium />Standings</MenuItem></MenuLink>
                </MenuList>
                {user ? 
                <UserContainer onClick={() => handleClickProfile()}>
                    <UserName>{user.userName}</UserName>
                    <LogoutButton onClick={(e) => handleLogOut(e, disconnectUser)}><IoExitOutline style={{color: `${COLORS.secondOne}`, width: '100%', height: '100%'}}/></LogoutButton>
                </UserContainer>
                :
                <ButtonContainer>
                    <PrimaryButton text={"Login"} clickFunc={() => navigate('/login')} />
                    <SecondaryButton text={"Create Account"} clickFunc={() => navigate('/create-account')} />
                </ButtonContainer>
                }
            </MenuContainer>
        </Wrapper>
    )
}

const Wrapper = styled.nav`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 15vw;
    /* min-width: 180px; */
    background-color: #141414;
    color: white;
    position: fixed;
    justify-content: center;
`

const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 20px);
    padding-top: 50px;
    width: 100%;
`

const Logo = styled.img`
    cursor: pointer;
    width: 140px;
`

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const MenuList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const MenuItem = styled.li`
    display: flex;
    align-items: center;
    gap: 20px;
    width: calc(100% - 40px);
    padding: 0 20px;
    height: 50px;
`

const MenuLink = styled(NavLink)`
    text-decoration: none;
    color: inherit;
    width: 100%;
    border-left: 2.5px solid transparent;

    &:hover, &:focus{
        background-color: #242424;
        width: calc(100% - 2.5px);
    }

    &.active{
        background-color: #242424;
        border-left: ${COLORS.primary} solid 2.5px;
        width: calc(100% - 2.5px);
    }

    &:visited{

    }

`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 5% 0;
`

const UserContainer = styled.div`
    display: flex;
    border-top: 1px solid grey;
    padding: 4% 20px;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    cursor: pointer;

    &:hover, &:focus{
        background-color: #242424;
    }
`

const UserName = styled.p`
`

const LogoutButton = styled.button`
    display: flex;
    background-color: #242424;
    border: none;
    border-radius: 6px;
    height: 30px;
    width: 30px;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover, &:focus{
        background-color: ${COLORS.primaryHover};
    }
`



export default SidebarMenu;
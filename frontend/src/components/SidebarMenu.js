import { NavLink, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import logo from '../assets/logo-light.png'
import { IoAnalyticsSharp, IoHome, IoBarChart, IoCalendarClear, IoStatsChart, IoPodium, IoNewspaper, IoExitOutline, IoPersonCircle, IoPersonAddOutline } from "react-icons/io5";
import { COLORS } from "../Constants";
import PrimaryMenuButton from "./PrimaryMenuButton";
import SecondaryMenuButton from "./SecondaryMenuButton";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";


const SidebarMenu = ({openMenu}) => {
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
        <Wrapper openMenu={openMenu}>
            <MenuContainer>
                <LogoContainer><NavLink to='/'><Logo src={logo} openMenu={openMenu}/></NavLink></LogoContainer>
                <MenuList>
                    {user ? <MenuLink to='/'><MenuItem openMenu={openMenu}><MenuIcon><IoAnalyticsSharp /></MenuIcon><MenuText openMenu={openMenu}>Dashboard</MenuText></MenuItem></MenuLink> :
                    <MenuLink to='/'><MenuItem openMenu={openMenu}><MenuIcon><IoHome /></MenuIcon><MenuText openMenu={openMenu}>Home</MenuText></MenuItem></MenuLink>}
                    {/* <MenuLink to='/scoreboard'><MenuItem><IoNewspaper />Scores</MenuItem></MenuLink> */}
                    <MenuLink to='/statistics'><MenuItem openMenu={openMenu}><MenuIcon><IoStatsChart /></MenuIcon><MenuText openMenu={openMenu}>Statistics</MenuText></MenuItem></MenuLink>
                    <MenuLink to='/schedule'><MenuItem openMenu={openMenu}><MenuIcon><IoCalendarClear /></MenuIcon><MenuText openMenu={openMenu}>Schedule</MenuText></MenuItem></MenuLink>
                    <MenuLink to='/standings'><MenuItem openMenu={openMenu}><MenuIcon><IoPodium /></MenuIcon><MenuText openMenu={openMenu}>Standings</MenuText></MenuItem></MenuLink>
                </MenuList>
                {user ? 
                <UserContainer openMenu={openMenu} onClick={() => handleClickProfile()}>
                    <UserName openMenu={openMenu}>{user.userName}</UserName>
                    <LogoutButton onClick={(e) => handleLogOut(e, disconnectUser)}><IoExitOutline style={{color: `${COLORS.secondOne}`, width: '100%', height: '100%'}}/></LogoutButton>
                </UserContainer>
                :
                <ButtonContainer>
                    <PrimaryMenuButton openMenu={openMenu} text={"Login"} clickFunc={() => navigate('/login')} icon={<IoPersonCircle />}/>
                    <SecondaryMenuButton openMenu={openMenu} text={"Create Account"} clickFunc={() => navigate('/create-account')} icon={<IoPersonAddOutline />}/>
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
    width: ${props => props.openMenu ? '15vw' : '5vw'};
    transition: all 0.8s ease;
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
    /* padding-bottom: 10px; */
    width: 100%;
`

const Logo = styled.img`
    cursor: pointer;
    width: 140px;
    transition: all 0.8s ease;
    transform: translateX(${props => !props.openMenu && '-100%'});
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
    transition: all 0.8s ease;
    justify-content: ${props => !props.openMenu ? 'center' : 'flex-start'};
    /* justify-content: center; */
    gap: ${props => !props.openMenu ? '0px' : '20px' };
    width: calc(100% - 40px);
    padding: 0 20px;
    height: 50px;
`

const MenuText = styled.span`
    transition: all 0.8s ease;
    opacity: ${props => !props.openMenu && '0'};
    transform: translateX(${props => !props.openMenu ? '-50%' : '0%'});
    /* visibility: ${props => !props.openMenu && 'hidden'}; */
    width: ${props => !props.openMenu && '0px'};
`

const MenuIcon = styled.span`

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
    transition: all 0.5s ease;
    padding: ${props => !props.openMenu ? '4px 5px' : '4% 20px' };
    justify-content: ${props => !props.openMenu ? 'center' : 'space-between'};
    align-items: center;
    height: 50px;
    min-height: 65px;
    cursor: pointer;

    &:hover, &:focus{
        background-color: #242424;
    }
`

const UserName = styled.p`
    transition: all 0s ease;
    opacity: ${props => !props.openMenu && '0'};
    transform: translateX(${props => !props.openMenu ? '-50%' : '0%'});
    /* visibility: ${props => !props.openMenu && 'hidden'}; */
    width: ${props => !props.openMenu && '0px'};
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
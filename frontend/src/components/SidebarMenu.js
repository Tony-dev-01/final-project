import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import logo from '../assets/logo-light.png'
import { IoAnalyticsSharp, IoBarChart, IoCalendarClear, IoNewspaper, IoPodium } from "react-icons/io5";
import { COLORS } from "../Constants";


const SidebarMenu = () => {
    return (
        <Wrapper>
            <MenuContainer>
                <LogoContainer><NavLink to='/'><Logo src={logo} /></NavLink></LogoContainer>
                <MenuList>
                    <MenuLink><MenuItem><IoAnalyticsSharp />Dashboard</MenuItem></MenuLink>
                    <MenuLink><MenuItem><IoNewspaper />News</MenuItem></MenuLink>
                    <MenuLink><MenuItem><IoBarChart />Statistics</MenuItem></MenuLink>
                    <MenuLink><MenuItem><IoCalendarClear />Schedule</MenuItem></MenuLink>
                    <MenuLink><MenuItem><IoPodium />Standing</MenuItem></MenuLink>
                </MenuList>
                <ButtonContainer>
                    <LoginButton>Login</LoginButton>
                    <NewUserButton>Create Account</NewUserButton>
                </ButtonContainer>
            </MenuContainer>
        </Wrapper>
    )
}

const Wrapper = styled.nav`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 17vw;
    max-width: 220px;
    background-color: #141414;
    color: white;
    position: fixed;
    justify-content: center;
`

const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 95%;
`

const Logo = styled.img`
    cursor: pointer;
    width: 100px;
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
        border-left: ${COLORS.primary} solid 2.5px;
        width: calc(100% - 2.5px);
    }

    &:active{
        
    }

    &:visited{

    }

`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`

const LoginButton = styled.button`
    width: 80%;
    background-color: ${COLORS.primary};
    border: none;
    border-radius: 5px;
    height: 30px;
    color: white;
`

const NewUserButton = styled(LoginButton)`
    width: 80%;
    border: 2px solid ${COLORS.primary};
    background: transparent;
    color: ${COLORS.primary};
`

export default SidebarMenu;
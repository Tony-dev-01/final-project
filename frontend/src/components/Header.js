import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { COLORS } from "../Constants";

const Header = () => {
    return (
        <Wrapper>
                <NavList>
                    <MenuLink><MenuItem>NHL</MenuItem></MenuLink>
                    <MenuLink><MenuItem>NFL</MenuItem></MenuLink>
                    <MenuLink><MenuItem>NBA</MenuItem></MenuLink>
                    <MenuLink><MenuItem>MLB</MenuItem></MenuLink>
                </NavList>
        </Wrapper>
    )
};


const Wrapper = styled.nav`
    display: flex;
    align-items: center;
    height: 45px;
    width: 100vw;
    background-color: ${COLORS.secondThree};
    position: fixed;
    padding-left: 40px;
`

const Scoreboard = styled.div`
    display: flex;
    width: 100%;
    height: 3vh;
    background: turquoise;
`

const NavList = styled.ul`
    display: flex;
    gap: 40px;
    height: 100%;
`

const MenuItem = styled.li`
    display: flex;
    align-items: center;
    gap: 20px;
    width: calc(100% - 40px);
    padding: 0 20px;
`

const MenuLink = styled(NavLink)`
    display: flex;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    border-bottom: 2.5px solid transparent;
    margin-top: 2.5px;

    &:hover, &:focus{
        border-bottom: 2.5px solid ${COLORS.primary};
        padding: 0;
    }

    &:active{

    }
`

export default Header
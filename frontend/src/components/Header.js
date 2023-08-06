import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { COLORS } from "../Constants";

const Header = () => {
    return (
        <Wrapper>
            <NavList>
                <MenuLink><MenuItem>test</MenuItem></MenuLink>
                <MenuLink><MenuItem>test</MenuItem></MenuLink>
            </NavList>
        </Wrapper>
    )
};


const Wrapper = styled.nav`
    display: flex;
    align-items: center;
    height: 45px;
    width: 100vw;
    background-color: lightgrey;
    position: fixed;
    padding-left: 40px;
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
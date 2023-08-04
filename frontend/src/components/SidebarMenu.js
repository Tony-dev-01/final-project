import { NavLink } from "react-router-dom";
import { styled } from "styled-components";


const SidebarMenu = () => {
    return (
        <Wrapper>
            <Logo />
            <MenuList>
                <MenuItem><NavLink>test</NavLink></MenuItem>
                <MenuItem><NavLink>test</NavLink></MenuItem>
                <MenuItem><NavLink>test</NavLink></MenuItem>
            </MenuList>
        </Wrapper>
    )
}

const Wrapper = styled.nav`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 17vw;
    background-color: darkblue;
    position: fixed;
`

const Logo = styled.img`

`

const MenuList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 30px;
`

const MenuItem = styled.li`

`



export default SidebarMenu;
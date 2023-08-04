import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const Header = () => {
    return (
        <Wrapper>
            <NavList>
                <NavLink>test</NavLink>
                <NavLink>test</NavLink>
            </NavList>
        </Wrapper>
    )
};


const Wrapper = styled.nav`
    display: flex;
    align-items: center;
    height: 10vh;
    width: 83vw;
    background-color: lightgrey;
    position: fixed;
`

const NavList = styled.ul`
    display: flex;
    gap: 40px;
`

export default Header
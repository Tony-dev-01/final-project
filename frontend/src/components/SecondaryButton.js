import { COLORS } from "../Constants";
import { styled } from "styled-components";
import { PButton } from "./PrimaryButton";



const SecondaryButton  = ({text, clickFunc, type, openMenu, icon}) => {
    return (
        <SecButton openMenu={openMenu} type={type} onClick={clickFunc}><ButtonText openMenu={openMenu}>{text}</ButtonText>{icon !== undefined && icon}</SecButton>
    )
}

const SecButton = styled(PButton)`
    width: 80%;
    height: 40px;
    border: 2px solid ${COLORS.primary};
    background: transparent;
    color: ${COLORS.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${props => props.openMenu ? '5px' : '0'};

    &:hover, &:focus{
        background-color: transparent;
        color: ${COLORS.primaryHover};
        border: 2px solid ${COLORS.primaryHover};
    }
`

const ButtonText = styled.p`
    width: 100%;
`

export default SecondaryButton;
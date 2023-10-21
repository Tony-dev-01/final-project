import { styled } from "styled-components";
import { COLORS } from "../Constants";

const PrimaryButton = ({text, clickFunc, width, disabled, type, icon, openMenu}) => {
    return ( 
        <PButton type={type} onClick={clickFunc} width={width} disabled={disabled} openMenu={openMenu}><ButtonText openMenu={openMenu}>{text}</ButtonText>{icon !== undefined && icon}</PButton>
    )
}

export const PButton = styled.button`
    width: ${props => props.width || '80%'};
    background-color: ${COLORS.primary};
    border: none;
    border-radius: 5px;
    /* min-height: 30px; */
    height: 40px;
    padding: 10px 0;
    color: ${COLORS.secondOne};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${props => props.openMenu ? '5px' : '0'};

    &:hover, &:focus{
        background-color: ${COLORS.primaryHover};
    }

    &:disabled {
        background-color: grey;
        cursor: default;
    }
`

const ButtonText = styled.p`
    width: 100%;

`


export default PrimaryButton;
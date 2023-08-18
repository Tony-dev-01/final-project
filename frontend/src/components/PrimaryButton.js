import { styled } from "styled-components";
import { COLORS } from "../Constants";

const PrimaryButton = ({text, clickFunc, width, disabled}) => {
    return ( 
        <PButton onClick={clickFunc} width={width} disabled={disabled}>{text}</PButton>
    )
}

export const PButton = styled.button`
    width: ${props => props.width || '80%'};
    background-color: ${COLORS.primary};
    border: none;
    border-radius: 5px;
    height: 30px;
    color: ${COLORS.secondOne};
    cursor: pointer;

    &:hover, &:focus{
        background-color: ${COLORS.primaryHover};
    }

    &:disabled {
        background-color: grey;
        cursor: default;
    }

`

export default PrimaryButton;
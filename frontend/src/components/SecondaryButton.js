import { COLORS } from "../Constants";
import { styled } from "styled-components";
import { PButton } from "./PrimaryButton";



const SecondaryButton  = ({text, clickFunc, type}) => {
    return (
        <SecButton type={type} onClick={clickFunc}>{text}</SecButton>
    )
}

const SecButton = styled(PButton)`
    width: 80%;
    border: 2px solid ${COLORS.primary};
    background: transparent;
    color: ${COLORS.primary};

    &:hover, &:focus{
        background-color: transparent;
        color: ${COLORS.primaryHover};
        border: 2px solid ${COLORS.primaryHover};
    }
`

export default SecondaryButton;
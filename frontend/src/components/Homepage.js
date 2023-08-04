import { styled } from "styled-components";

const Homepage = () => {
    return (
        <Wrapper>
            <p>homepage</p> 
        </Wrapper>
    )
};

const Wrapper = styled.div`
    display: flex;
    position: relative;
    width: 80vw;
    margin-top: 10vh;
    justify-content: flex-end;
    /* align-items: flex-end; */
`

export default Homepage;
import { styled } from "styled-components";
import Header from "./Header";
import Slider from "./Slider";

const Homepage = () => {
    return (
        <Wrapper>
            <Header />
            <Content>
                <h1>Homepage</h1>
                <h2>News</h2>
                <Slider />
            </Content>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 83vw;
    height: 100vh;
    margin: auto;
    justify-content: flex-start;
    align-items: flex-start;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10vh;
    height: 100vh;
`

export default Homepage;
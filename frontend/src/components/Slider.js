import NewsBox from "./NewsBox";
import { styled } from "styled-components";

const Slider = ({content}) => {
    return (
        <Wrapper>
            {content.map((news) => {
                return(
                        <NewsBox news={news} />
                )

            })}
        </Wrapper>
    )
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`




export default Slider;
import styled from 'styled-components'
import NewsDetails from './NewsDetails';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const handleClick = (news, navigate) => {
    navigate(`/news/${news.id}`)
};

const NewsBox = ({news}) => {
    const navigate = useNavigate();
    console.log(news)

    return (
        <Wrapper role='link' onClick={() => handleClick(news, navigate)}>
            <Container>
                <ArticleImage src={news.images[0].url}/>
                <InfoSection>
                    <p>{news.headline}</p>
                </InfoSection>
            </Container>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    display: flex;
    cursor: pointer;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 300px;
    min-width: 250px;
    width: auto;
    height: auto;
    max-height: 250px;
    min-height: 200px;
    border-radius: 8px;
    background-color: grey;
`

const ArticleImage = styled.img`
    border-radius: 8px 8px 0 0;
`

const InfoSection = styled.div`
    display: flex;
    background-color: #f0f0f0;
    height: calc(fit-content + 10px);
    width: calc(100% - 30px);
    border-radius: 0 0 8px 8px;
    padding: 15px 15px;
`



export default NewsBox;
import styled from 'styled-components'
import NewsDetails from './NewsDetails';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { format, compareAsc } from 'date-fns';
import { COLORS } from '../Constants';

const handleClick = (news, navigate) => {
    if (news.id !== undefined){
        navigate(`/news/${news.id}`)
    } else {
        const url = news.links.api.news.href.split('/')
        navigate(`/news/${url[url.length - 1]}`)
    }
};

const convertDate = (date) => {
    const month = format(new Date(date), 'MMM');
    const day = format(new Date(date), 'd');
    const year = format(new Date(date), 'y')
    const hour = format(new Date(date), 'h');
    const minutes = format(new Date(date), 'mm');
    const timeframe = format(new Date(date), 'a');
    return `${month} ${day}, ${year} · ${hour}:${minutes} ${timeframe}`;
}

const NewsBoxBig = ({news}) => {
    const navigate = useNavigate();

    return (
        <Wrapper role='link' onClick={() => handleClick(news, navigate)}>
                <Container src={news.images.length > 0 && news.images[0].url !== undefined && news.images[0].url}> 
                <div></div>
                <InfoSection>
                    <Headline>{news.headline}</Headline>
                    <DatePublished>{convertDate(news.lastModified)}</DatePublished>
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
    width: 100%;
    height: 370px;
    border-radius: 8px;
    background-color: pink;
    background-image: url(${props => props.src || 'lightgrey'});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
`

const Headline = styled.p`
    font-weight: 600;
    font-size: 1.1em;
`

const DatePublished = styled.p`
    font-size: 0.9em;
`


const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    background-color: ${COLORS.secondOne};
    height: fit-content;
    width: calc(100% - 30px);
    border-radius: 0 0 7px 7px;
    padding: 15px 15px;
`



export default NewsBoxBig;
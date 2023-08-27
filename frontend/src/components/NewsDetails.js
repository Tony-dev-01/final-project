import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../Constants";
import NewsBox from "./NewsBox";
import { format, compareAsc } from 'date-fns';
import Header from "./Header";
import ReactPlayer from 'react-player'
import { Content } from "./Homepage";

const convertDate = (date) => {
    const month = format(new Date(date), 'MMM');
    const day = format(new Date(date), 'd');
    const year = format(new Date(date), 'y')
    const hour = format(new Date(date), 'h');
    const minutes = format(new Date(date), 'mm');
    const timeframe = format(new Date(date), 'a');
    return `${month} ${day}, ${year} · ${hour}:${minutes} ${timeframe}`;
}

const NewsDetails = () => {
    const [news, setNews] = useState({});
    const params = useParams();
    const newsId = params.id;

    console.log(news)

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`/news/${newsId}`);
                const data = await response.json();
                setNews(data.data)
            } catch(err) {
                console.log(err.message)
            }
        }

        fetchNews();
    }, [])

    return (
        <>
        <Header />
        <Wrapper>
            <Container>
                {Object.keys(news).length > 0 ?
                <>
                <HeaderContainer>
                    {news.video.length > 0 ? <ArticleVideo width='100%' light={<img src={news.video[0].thumbnail} alt='Thumbnail' width='100%' />} url={news.video[0].links.source.href !== undefined && news.video[0].links.source.href} playing={true} controls={true} />:
                    <ArticleImage src={news.images.length > 0 && news.images[0].url !== undefined && news.images[0].url}/>
                    }
                    <TitleContainer>
                        <h1>{news.headline}</h1>
                        <Description>{news.description}</Description>
                    </TitleContainer>
                    {news.source !== undefined &&
                        <Source>Source: {news.source}</Source>
                    }
                    <Published>{convertDate(news.published)}</Published>
                </HeaderContainer>
                <Article>
                    <div dangerouslySetInnerHTML={{__html: news.story}}></div>
                </Article>
                {news.related.length > 0 &&
                <RelatedArticlesContainer>
                    <RelatedArticlesTitle>Related Articles</RelatedArticlesTitle>
                    <RelatedArticles>
                        {news.related.map((n) => <NewsBox news={n} />)}
                    </RelatedArticles>
                </RelatedArticlesContainer>
                }
                </>
            :
            <>
            <ErrorMessage>
                Article not available.
            </ErrorMessage>
            </>
                }
            </Container>
        </Wrapper>
        </>
    )
};

const Wrapper = styled.main`
    display: flex;
    flex-wrap: wrap;
    padding: 0 30px;
    width: 83vw;
    width: calc(100% - 60px);
    margin: 40px 0;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 66%;
`

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 15px;
`

const ArticleImage = styled.img`

`

const ArticleVideo = styled(ReactPlayer)`
    display: flex;
    justify-content: flex-start;
    width: fit-content;
`



const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`

const Description = styled.p`
    font-weight: 600;
    font-size: 1.1em;
`

const Source = styled.p`
    font-weight: 600;
    font-size: 0.9em;
`

const Published = styled.p`
    color: grey;
    font-style: italic;
`


const Article = styled.div`
    display: flex;
    flex-direction: column;
    border-top: 1.5px solid lightgrey;
    padding-top: 25px;
`

const RelatedArticlesContainer = styled.div`
    display: flex;
    margin-top: 30px;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    gap: 15px;
`

const RelatedArticlesTitle = styled.h3`
    border-bottom: 2.5px solid ${COLORS.primary};
    width: fit-content;
`

const RelatedArticles = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    width: 100%;
`

const ErrorMessage = styled.p`
    margin-top: 20px;
`


export default NewsDetails;
import { styled } from "styled-components";
import Header from "./Header";
import Slider from "./Slider";
import { useContext, useEffect, useState } from "react";
import NewsBoxBig from "./NewsBoxBig";
import { COLORS } from "../Constants";
import ScoreBox from "./ScoreBoxSmall";

const Homepage = () => {
    const [news, setNews] = useState([]);
    const [scoreboard, setScoreboard] = useState({});

    console.log(scoreboard)

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/news');
                const data = await response.json();
                setNews(data.data)
            } catch(err) {
                console.log(err.message)
            }
        }

        const fetchScoreboard = async () => {
            try {
                const response = await fetch('/scoreboard');
                const data = await response.json();
                setScoreboard(data.data)
            } catch(err) {
                console.log(err.message)
            }
        }

        fetchNews();
        fetchScoreboard();

    }, [])

    return (
        <Wrapper>
            <Header />
            <Content>
                <h1>Home</h1>
                <Section>
                <MainContent>
                    {news.length > 0 && news.map((news) => <NewsBoxBig news={news} />)}
                    {/* <Slider content={news}/> */}
                </MainContent>
                <Sibebar>
                    <SidebarScoreboard>
                        <SidebarTitle>Scoreboard</SidebarTitle>
                        <Scoreboard>
                            {Object.keys(scoreboard).length > 0 && 
                            scoreboard.sports.map((sport) => {
                                if (sport.name === 'Baseball'){
                                    return sport.leagues.map((league) => {
                                        if(league.abbreviation === "MLB"){
                                            return league.events.map((event) => <ScoreBox game={event} />)
                                        }
                                    })
                                }
                            })}
                        </Scoreboard>
                    </SidebarScoreboard>
                </Sibebar>
                </Section>
            </Content>
        </Wrapper>
    )
};

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 83vw;
    height: 100vh;
    margin: auto;
    justify-content: flex-start;
    align-items: flex-start;
`

export const Content = styled.main`
    display: flex;
    gap: 50px;
    flex-direction: column;
    margin-top: 15vh;
    height: 100vh;
    width: calc(100% - 60px);
    padding: 0 30px;
`

const Section = styled.section`
    display: flex;
    gap: 15px;
    width: 100%;
    justify-content: space-between;
`

const MainContent = styled.section`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 60%;
`

const Sibebar = styled.section`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 40%;
`

const SidebarScoreboard = styled.div`
    background-color: ${COLORS.secondOne};
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: calc(100% - 20px);
    height: fit-content;
    padding: 15px 10px;
    border-radius: 8px;
`

const SidebarTitle = styled.h3`
    font-size: 1.3em;
`

const Scoreboard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`




export default Homepage;
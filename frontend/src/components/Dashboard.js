import { styled } from "styled-components";
import Header from "./Header";
import Slider from "./Slider";
import { useContext, useEffect, useState } from "react";
import NewsBoxBig from "./NewsBoxBig";
import { COLORS } from "../Constants";
import ScoreBox from "./ScoreBoxSmall";
import { UserContext } from "../context/UserContext";
import { Wrapper, Content } from "./Homepage";
import { Link } from "react-router-dom";
import { format, compareAsc } from 'date-fns';

const Dashboard = () => {
    const {user} = useContext(UserContext);
    const [news, setNews] = useState([]);
    const [scoreboard, setScoreboard] = useState({});
    const [selectedTeam, setSelectedTeam] = useState(() => {
        if (user.favoriteTeams !== undefined && user.favoriteTeams.length > 0){
            return user.favoriteTeams[0];
        } else {
            return {};
        }
    });

    const [stats, setStats] = useState({});
    const [schedule, setSchedule] = useState([]);
    const [teamRecord, setTeamRecord] = useState({});

    news.length > 0 && console.log(news);

    const convertDate = (date) => {
        const month = format(new Date(date), 'MMM');
        const day = format(new Date(date), 'd');
        const year = format(new Date(date), 'y')
        const dayOfWeek = format(new Date(date), 'cccc');
        return `${dayOfWeek}, ${month} ${day}`;
    };

    const handleTeamSelect = (e) => {
        let data;

        user.favoriteTeams.map((team) => {
            console.log(team)
            if (team.slug === e.target.value){
                data = team
            } 
        })

        return setSelectedTeam(data)
    }

    useEffect(() => {
        const fetchNews = async () => {
            try {
                let data;
                let response;

                if (user.favoriteTeams !== undefined && user.favoriteTeams.length > 0 && Object.keys(selectedTeam).length > 0){
                    let selectTeam;
                    user.favoriteTeams.map((team) => {
                        if (team.slug === selectedTeam.slug){
                            selectTeam = team;
                        }
                    })
                    response = await fetch(`/news/${selectTeam.league.sport}/${selectTeam.league.league}/${selectTeam.id}`);
                } else {
                    response = await fetch('/news');
                }
                data = await response.json();
                setNews(data.data.articles)
            } catch(err) {
                console.log(err.message)
            }
        }

        const fetchScoreboard = async () => {
            try {
                const response = await fetch('/scoreboard');
                const data = await response.json();
                setScoreboard(data.data);
            } catch(err) {
                console.log(err.message)
            }
        }

        const fetchStats = async () => {
            try {
                const response = await fetch(`/statistics/${selectedTeam.league.league}/${selectedTeam.id}/2023`);
                const data = await response.json();

                const teamResponse = await fetch(`${data.data.team.$ref}`);
                const teamData = await teamResponse.json();

                const teamRecord = await fetch(`${teamData.record.$ref}`);
                const record = await teamRecord.json();
                
                setStats(data.data)
                setTeamRecord(record)
            } catch(err) {
                console.log(err.message)
            }
        };

        const fetchSchedule = async () => {
            try {
                const request = await fetch (`/schedule/${selectedTeam.league.league}/${selectedTeam.id}`)
                const data = await request.json();

                console.log(data.data);
                setSchedule(data.data);

            } catch (err){
                console.log(err.message);
            }
        };

        fetchNews();
        fetchStats();
        fetchScoreboard();
        fetchSchedule();

    }, [selectedTeam])

    return (
        <Wrapper>
            <Header />
            <Content>
                <h1>Dashboard</h1>
                <div>
                    {user.favoriteTeams === undefined || user.favoriteTeams.length === 0 ?
                    <p><Link to="/user/pick-team">Click here</Link> to choose your favorite team.</p> : 
                    <SelectTeamDrop>
                    <label for='teams'>Select team</label>
                        <select name='teams' defaultValue={user.favoriteTeams[0].displayName} onChange={(e) => handleTeamSelect(e)} >
                            {user.favoriteTeams.map((team) => {
                                return (
                                    <option value={team.slug} key={team.id}>{team.displayName}</option>
                                )
                            })}
                        </select>
                    </SelectTeamDrop>
                    }
                </div>
                <MainContainer>
                    {user.favoriteTeams !== undefined && user.favoriteTeams.length > 0 &&
                    <StatsContainer>
                        {Object.keys(teamRecord).length > 0 &&
                        <>
                            <TeamLogo src={selectedTeam.logos[0].href}/>
                            <TeamInfo>
                                <TeamName>{selectedTeam.displayName}</TeamName>
                                <p>{teamRecord.items[0].displayValue}</p>
                            </TeamInfo>
                        </>
                        }
                    </StatsContainer>
                    }
                    {user.favoriteTeams !== undefined && user.favoriteTeams.length > 0 &&
                    <ScheduleContainer>
                        <h3>Schedule</h3>
                        <GameContainer>
                            {schedule.length > 0 ?
                                schedule.map((game) => {
                                    return (
                                        <Game>
                                            <GameInfoContainer>
                                                <GameDate>{convertDate(game.date)}</GameDate>
                                                    <GameLogoContainer>
                                                    {game.competitions[0].competitors.map((team) => {
                                                        return (
                                                            <GameTeamContainer>
                                                                <GameLogo src={team.team.logo} />
                                                                <GameTeamName>{team.team.displayName}</GameTeamName>
                                                            </GameTeamContainer>
                                                        )
                                                    })}
                                                    </GameLogoContainer>
                                            </GameInfoContainer>
                                        </Game>
                                    )
                                }) :
                                <NoData>No upcoming games</NoData>
                            }
                        </GameContainer>
                    </ScheduleContainer>
                    }
                    <Section>
                <MainContent>
                    {news.length > 0 && news.map((news) => <NewsBoxBig news={news} key={news.id}/>)}
                    {/* <Slider content={news}/> */}
                </MainContent>
                <Sibebar>
                    <SidebarScoreboard>
                        <SidebarTitle>Scoreboard</SidebarTitle>
                        <Scoreboard>
                            {Object.keys(scoreboard).length > 0 && user.favoriteTeams !== undefined && user.favoriteTeams.length > 0 && scoreboard.sports.map((sport) => sport.slug === selectedTeam.league.sport && true).includes(true) ?
                            scoreboard.sports.map((sport) => {
                                if (sport.slug === selectedTeam.league.sport){
                                        return sport.leagues[0].events.map((event) => <ScoreBox game={event} />)       
                                    }
                            })
                            : Object.keys(scoreboard).length === 0 || user.favoriteTeams === undefined || user.favoriteTeams.length === 0 || !scoreboard.sports.map((sport) => sport.slug === selectedTeam.league.sport && true).includes(true) ?
                                <NoData>No data available</NoData>
                            : 
                            scoreboard.sports.map((sport) => {
                                if (sport.name === 'Baseball'){
                                    return sport.leagues.map((league) => {
                                        if(league.abbreviation === "MLB"){
                                            return league.events.map((event) => <ScoreBox game={event} />)
                                        }
                                    })
                                }
                            })
                            }
                        </Scoreboard>
                    </SidebarScoreboard>
                </Sibebar>
                </Section>
                </MainContainer>
            </Content>
        </Wrapper>
    )
};

const Section = styled.section`
    display: flex;
    gap: 15px;
    width: 100%;
    justify-content: space-between;
`

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
`

const SelectTeamDrop = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

const StatsContainer = styled.div`
    display: flex;
    width: calc(100% - 20px);
    background: ${COLORS.secondOne};
    border-radius: 8px;
    gap: 15px;
    align-items: center;
    padding: 10px;
`

const TeamName = styled.h2`
`

const TeamLogo = styled.img`
    width: 70px;
`

const TeamInfo = styled.div`
    display: flex;
    flex-direction: column;
`


const ScheduleContainer = styled.div`
    display: flex;
    width: calc(100% - 20px);
    background: ${COLORS.secondOne};
    border-radius: 8px;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
`

const GameContainer = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`

const Game = styled.div`
    display: flex;
    background-color: white;
    border-radius: 8px;
    width: 30%;
    padding: 10px;
    justify-content: space-between;
`

const GameLogo = styled.img`
    width: 60px;
`

const GameInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
`

const GameInfo = styled.div`
    display: flex;
`

const GameDate = styled.p`
    font-weight: bold;
    font-size: 1.1em;
`

const GameLogoContainer = styled.div`
    display: flex;
    gap: 30px;
    justify-content: space-around;
    align-items: center;
    width: 100%;
`

const GameTeamName = styled.p`
    text-align: center;
`

const GameTeamContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
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
    width: 37%;
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

const NoData = styled.p`
    font-style: italic;
    color: grey;
`

export default Dashboard;
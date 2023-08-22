import { styled } from "styled-components"
import { Wrapper, Content } from "./Homepage"
import Header from "./Header"
import { useContext, useEffect, useState } from "react"
import { LeagueContext } from "../context/LeagueContext"
import { COLORS } from "../Constants"


const Standings = () => {
    const [selectedSeason, setSelectedSeason] = useState('');
    const [selectedLeague, setSelectedLeague] = useState('');
    const [data, setData] = useState({});

    const [error, setError] = useState('');
    const {state, updateLeague} = useContext(LeagueContext);

    console.log(data)

    // console.log(teams)

    const handleLeagueSelect = async (e) => {
        const league = e.target.value;
        let sport;
        if (league.length > 0){
            if(league === 'nhl'){
                sport = 'hockey'
            } else if (league === 'nfl'){
                sport = 'football'
            } else if (league === 'nba'){
                sport = 'basketball'
            } else if (league === 'mlb'){
                sport = 'baseball'
            }
            updateLeague({sport: sport, league: league})
            setSelectedLeague(league);
        }
    }

    const handleSeasonSelect = async (e) => {
        setSelectedSeason(e.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(`/standings/${selectedLeague}`);
                const data = await response.json();

                if (data.status === 404){
                    throw new Error(data.message);
                } else if (data.status === 200){
                    setError('');
                    setData(data.data);
                }

            } catch(err){
                setError(err.message);
            }
        };

        if (selectedLeague.length > 0){
            fetchData();
        }

    }, [selectedLeague]);

    return (
        <Wrapper>
            <Header />
            <Content>
                <h1>Standings</h1>
                <Section>
                    <Container>
                        <TopBar>
                            <LeagueContainer>
                            <label htmlFor="league">Select league</label>
                                <select name="league" defaultValue={""} id="league" onChange={(e) => handleLeagueSelect(e)}>
                                    <option value="" >Select league</option>
                                    <option value="nhl" selected={state.league === 'nhl'}>NHL</option>
                                    <option value="nfl" selected={state.league === 'nfl'}>NFL</option>
                                    <option value="nba" selected={state.league === 'nba'}>NBA</option>
                                    <option value="mlb" selected={state.league === 'mlb'}>MLB</option>
                                </select>
                            </LeagueContainer>
                            {/* <SeasonContainer>
                                <label htmlFor="season">Select season</label>
                                <select name="season" defaultValue={""} id="season" onChange={(e) => handleSeasonSelect(e)}>
                                    <option value="">Select season</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                </select>
                            </SeasonContainer> */}
                        </TopBar>
                    </Container>
                </Section>
                    {/* {Object.keys(teamData).length > 0 || error.length > 0 && */}
                    <StatsContainer>
                        {error.length > 0 ?
                            <ErrorMessage>{error}</ErrorMessage> :
                            Object.keys(data).length > 0 &&
                            <>
                                <StatsTitle>{selectedLeague.toUpperCase()}</StatsTitle>
                                {Object.keys(data).length > 0 &&
                                    <>
                                        {data.groups.length > 0 &&
                                            data.groups.map((division) => {
                                                return (
                                                    <>
                                                    {division.groups !== undefined ?
                                                        
                                                        division.groups.map((group) => {
                                                        return (
                                                            <DivisonContainer>
                                                            <h4>{group.name}</h4>
                                                            <TeamDisplayContainer>
                                                            {group.standings['entries'].length > 0 &&
                                                            group.standings['entries'].map((team) => {
                                                                return (
                                                                    <TeamDisplay>
                                                                        <TeamInfo>
                                                                            <TeamRank>{team.team.seed}</TeamRank>
                                                                            <TeamLogo src={team.team.logos[0].href} />
                                                                            <p>{team.team.displayName}</p>
                                                                        </TeamInfo>
                                                                        <TeamStatsContainer>
                                                                        {team.stats.map((stats) => {
                                                                            return (
                                                                                <TeamStats>
                                                                                    <StatsName>{stats.shortDisplayName}</StatsName>
                                                                                    <p>{stats.displayValue}</p>
                                                                                </TeamStats>
                                                                            )
                                                                        })}
                                                                        </TeamStatsContainer>
                                                                    </TeamDisplay>
                                                                )
                                                            })}
                                                            </TeamDisplayContainer>
                                                            </DivisonContainer>
                                                        )
                                                    }) :
                                                    <>
                                                        <h4>{division.name}</h4>
                                                        <NoDataMessage>No data available.</NoDataMessage>
                                                    </>
                                                    }

                                                    </>
                                                )
                                            })
                                        }
                                    </>
                                }
                            </>
                        }
                    </StatsContainer>
                    {/* } */}
            </Content>
        </Wrapper>
    )
}


const Section = styled.section`
    display: flex;
`

const Container = styled.div`
    display: flex;
`




const StatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: calc(100% - 30px);
    height: 100%;
    border-radius: 8px;
    padding: 15px;
    background-color: ${COLORS.secondOne};
`

const StatsTitle = styled.h3`
`


const StatsBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: calc(150px - 10px);
    height: calc(150px - 45px);
    padding: 22.5px 5px;
    border-radius: 8px;
    background: white;
    justify-content: space-between;
    align-items: center;
`

const StatsRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const StatsRows = styled.div`
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
`

const StatsRank = styled.p`
    font-style: italic;
    color: grey;
`

const StatsValue = styled.p`
    font-size: 2.2em;
`

const StatIdent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`



const TopBar = styled.div`
    display: flex;
    gap: 10px;
`

const LeagueContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const TeamContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const SeasonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const ErrorMessage = styled.p`
    font-style: italic;
    color: grey;
    width: 100%;
    display: flex;
    margin-top: 40px;
    justify-content: center;
    align-items: center;
`

const NoDataMessage = styled(ErrorMessage)`
`

const TeamName = styled.h2`
`

const TeamLogo = styled.img`
    width: 60px;
`

const DivisonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`


const TeamDisplayContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const TeamDisplay = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    background-color: white;
    border-radius: 8px;
    padding: 0 20px;
    width: calc(100% - 40px);
    height: 70px;
`

const TeamInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`

const TeamStatsContainer = styled.div`
    display: flex;
    gap: 20px;
    width: 68%;
`

const TeamStats = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
`

const StatsName = styled.p`
    font-weight: bold;
`


const TeamRank = styled.p`
    font-weight: bold;
    font-size: 1.2em;
`



const TeamRecord = styled.p`

`



// const TeamLogo = styled.img`
// `


export default Standings;
import { styled } from "styled-components"
import { Wrapper } from "./Homepage"
import Header from "./Header"
import { useContext, useEffect, useState } from "react"
import { LeagueContext } from "../context/LeagueContext"
import { COLORS } from "../Constants"


const Statistics = () => {
    const [teams, setTeams] = useState({});
    const [selectedTeam, setSelectedTeam] = useState({});
    const [selectedSeason, setSelectedSeason] = useState('');
    const [selectedLeague, setSelectedLeague] = useState('');
    const [teamData, setTeamData] = useState({});
    const [teamInfo, setTeamInfo] = useState({});
    const [teamRecord, setTeamRecord] = useState({});
    const [error, setError] = useState('');
    const {state, updateLeague} = useContext(LeagueContext);


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

    const handleTeamSelect = (e) => {
        
        setSelectedTeam(e.target.value)
    }

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('/teams');
                const data = await response.json();
                setTeams(data.data);
            } catch(err) {
                console.log(err.message)
            }
        }

        if (selectedLeague.length !== 0){
            fetchTeams();
        }

    }, [selectedLeague])

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(`statistics/${selectedLeague}/${selectedTeam}/${selectedSeason}`);
                const data = await response.json();
                console.log(data);

                if (data.status === 404){
                    throw new Error(data.message);
                } else if (data.status === 200){
                    setError('');
                    const teamResponse = await fetch(`${data.data.team.$ref}`);
                    const teamData = await teamResponse.json();


                    const teamRecord = await fetch(`${teamData.record.$ref}`);
                    const record = await teamRecord.json();

                    setTeamRecord(record);
                    setTeamData(data.data);
                    setTeamInfo(teamData);

                }

            } catch(err){
                setError(err.message);
            }
        };

        if (selectedLeague.length > 0 && selectedSeason.length > 0 && selectedTeam.length > 0){
            fetchData();
        }

    }, [selectedSeason, selectedTeam, selectedLeague]);

    return (
        <Wrapper>
            <Header />
            <Content>
                <h1>Statistics</h1>
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
                            <TeamContainer>
                            <label htmlFor="team">Select team</label>
                                <select name="team" id="team" defaultValue={""} onChange={(e) => handleTeamSelect(e)}>
                                    <option value="" >Select team</option>
                                    {state.data &&
                                    state.data.map((team) => {
                                        return (
                                            <option value={team.id} key={team.id}>{team.displayName}</option>
                                        )
                                    })
                                    }
                                </select>
                            </TeamContainer>
                            <SeasonContainer>
                                <label htmlFor="season">Select season</label>
                                <select name="season" defaultValue={""} id="season" onChange={(e) => handleSeasonSelect(e)}>
                                    <option value="">Select season</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                </select>
                            </SeasonContainer>
                        </TopBar>
                    </Container>
                </Section>
                    {/* {Object.keys(teamData).length > 0 || error.length > 0 && */}
                    <StatsContainer>
                        {error.length > 0 ?
                            <ErrorMessage>{error}</ErrorMessage> :
                            Object.keys(teamData).length > 0 &&
                            <>
                            {Object.keys(teamInfo).length > 0 &&
                            <TeamDisplay>
                                <TeamLogo src={teamInfo.logos[0].href} />
                                <TeamRecordContainer>
                                    <TeamName>{teamInfo.displayName}</TeamName>
                                    {Object.keys(teamRecord).length > 0 &&
                                        <TeamRecord>{teamRecord.items[0].displayValue}</TeamRecord>
                                    }
                                </TeamRecordContainer>
                            </TeamDisplay>
                            }
                                {/* <StatsTitle>Team</StatsTitle> */}
                                <Stats>
                                    {teamData.splits.categories.map((category) => {
                                        return (
                                            <StatsRow>
                                                <h4>{category.displayName}</h4>
                                                <StatsRows>
                                                {category.stats.map((stat) => {
                                                    return(
                                                        <StatsBox key={stat.abbreviation}>
                                                            <StatIdent>
                                                                <StatsValue>{stat.displayValue}</StatsValue>
                                                                <StatsName>{stat.displayName}</StatsName>
                                                            </StatIdent>
                                                            <StatsRank>{stat.rankDisplayValue}</StatsRank>
                                                        </StatsBox>
                                                    )
                                                })}
                                                </StatsRows>
                                            </StatsRow>
                                        )
                                    })}
                                </Stats>
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

const Content = styled.main`
    display: flex;
    gap: 50px;
    flex-direction: column;
    margin-top: 15vh;
    min-height: 100vh;
    height: 100%;
    width: calc(100% - 60px);
    padding: 0 30px;
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

const Stats = styled.div`
    display: flex;
    height: 100px;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
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

const StatsName = styled.p`
    text-align: center;
    font-weight: bold;
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

const TeamName = styled.h2`
`

const TeamLogo = styled.img`
    width: 150px;
`

const TeamDisplay = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`

const TeamRecordContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const TeamRecord = styled.p`

`



// const TeamLogo = styled.img`
// `


export default Statistics
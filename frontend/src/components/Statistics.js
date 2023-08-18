import { styled } from "styled-components"
import { Wrapper, Content } from "./Homepage"
import Header from "./Header"
import { useContext, useEffect, useState } from "react"
import { LeagueContext } from "../context/LeagueContext"
import { COLORS } from "../Constants"


const Statistics = () => {
    const [teams, setTeams] = useState({});
    const [selectedTeam, setSelectedTeam] = useState({});
    const {state, updateLeague} = useContext(LeagueContext);

    console.log(state)

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
        }
    }

    const handleTeamSelect = async (e) => {
        setSelectedTeam(e.target.value)

        try{

        } catch(err){
            console.log(err.message)
        }
    }

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('/teams');
                const data = await response.json();
                setTeams(data.data)
            } catch(err) {
                console.log(err.message)
            }
        }

        fetchTeams();

    }, [])

    return (
        <Wrapper>
            <Header />
            <Content>
                <h1>Statistics</h1>
                <Section>
                    <Container>
                        <TopBar>
                            <LeagueContainer>
                            <label for="league">Select a league</label>
                                <select name="league" id="league" onChange={(e) => handleLeagueSelect(e)}>
                                    <option value="" default>Select a league</option>
                                    <option value="nhl" selected={state.league === 'nhl'}>NHL</option>
                                    <option value="nfl" selected={state.league === 'nfl'}>NFL</option>
                                    <option value="nba" selected={state.league === 'nba'}>NBA</option>
                                    <option value="mlb" selected={state.league === 'mlb'}>MLB</option>
                                </select>
                            </LeagueContainer>
                            <TeamContainer>
                            <label for="team">Select a team</label>
                                <select name="team" id="team" onChange={(e) => handleTeamSelect(e)}>
                                    <option value="" default>Select a team</option>
                                    {state.data &&
                                    state.data.map((team) => {
                                        return (
                                            <option value={team.slug}>{team.displayName}</option>
                                        )
                                    })
                                    }
                                </select>
                            </TeamContainer>
                        </TopBar>
                    </Container>
                </Section>
                <Section>
                    <StatsContainer>

                    </StatsContainer>
                </Section>
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
    width: 100px;
    height: 100px;
    border-radius: 8px;
    background-color: ${COLORS.secondOne};
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

export default Statistics
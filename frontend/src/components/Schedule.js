import { styled } from "styled-components"
import { Wrapper, Content } from "./Homepage"
import Header from "./Header"
import { useContext, useEffect, useState } from "react"
import { LeagueContext } from "../context/LeagueContext"
import { COLORS } from "../Constants"
import { format, compareAsc } from 'date-fns';


const Schedule = () => {
    const [teams, setTeams] = useState({});
    const [selectedTeam, setSelectedTeam] = useState({});
    const [selectedSeason, setSelectedSeason] = useState('');
    const [selectedLeague, setSelectedLeague] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [scheduleData, setScheduleData] = useState({});
    const [teamInfo, setTeamInfo] = useState({});
    const [error, setError] = useState('');
    const {state, updateLeague} = useContext(LeagueContext);
    const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];


    const convertDate = (date) => {
        const month = format(new Date(date), 'MMM');
        const day = format(new Date(date), 'd');
        const year = format(new Date(date), 'y')
        const dayOfWeek = format(new Date(date), 'cccc');
        return `${dayOfWeek}, ${month} ${day}`;
    }

    const convertTime = (date) => {
        const hour = format(new Date(date), 'HH');
        const minutes = format(new Date(date), 'mm');
        const timeOfDay = format(new Date(date), 'a');
        return `${hour}:${minutes} ${timeOfDay}`;
    }

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

    const handleTimeSelect = (e) => {
        setSelectedTime(e.target.value);
    }

    const handleDateSelect = (e) => {
        console.log(e.target.value);
        setSelectedTime(e.target.value.split("-").join(""));
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                let data;

                if (selectedLeague === 'nfl'){
                    const response = await fetch(`/schedule/${selectedLeague}?season=${selectedSeason}&week=${selectedTime}`);
                    data = await response.json();
                } else {
                    const response = await fetch(`/schedule/${selectedLeague}?date=${selectedTime}`);
                    data = await response.json();
                }

                if (data.status === 404){
                    throw new Error(data.message);
                } else if (data.status === 200){
                    setError('');
                    setScheduleData(data.data);
                }

            } catch(err){
                setError(err.message);
            }
        };

        if (selectedLeague === 'nfl'){
            if (selectedLeague.length > 0 && selectedSeason.length > 0 && selectedTime.length > 0){
                fetchData();
            }
        } else {
            if (selectedLeague.length > 0 && selectedTime.length > 0){
                fetchData();
            }
        }

    }, [selectedSeason, selectedLeague, selectedTime]);

    useEffect(() => {
        setSelectedSeason('');
        setSelectedTime('');
    }, [selectedLeague])

    return (
        <Wrapper>
            <Header />
            <Content>
                <h1>Schedule</h1>
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
                            
                            <SeasonContainer>
                                {selectedLeague.length > 0 &&
                                selectedLeague === 'nfl' &&
                                <>
                                <label htmlFor="season">Select season</label>
                                <select name="season" defaultValue={""} id="season" onChange={(e) => handleSeasonSelect(e)}>
                                    <option value="">Select season</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                </select>
                                </>
                                }
                            </SeasonContainer>
                            <TimeContainer>
                                
                                    <>
                                    {selectedLeague.length > 0 &&
                                        selectedLeague === 'nfl' ?
                                            <> 
                                            <label htmlFor="time">Select week</label>
                                                <select name="time" id="time" defaultValue={""} onChange={(e) => handleTimeSelect(e)}>
                                                    <option value="" >Select week</option>
                                                    {weeks.map((week) => {
                                                        return <option value={week} key={week}>{week}</option>
                                                    })} 
                                                </select>
                                            </>
                                            :
                                            <>
                                            <label htmlFor="date">Select a date</label>
                                                <input type="date" name="date" placeholder="Select a date" onChange={(e) => handleDateSelect(e)}/>
                                            </>
                                    }
                                    </>
                            </TimeContainer>
                        </TopBar>
                    </Container>
                </Section>
                    {/* {Object.keys(teamData).length > 0 || error.length > 0 && */}
                    <StatsContainer>
                        {error.length > 0 ?
                            <ErrorMessage>{error}</ErrorMessage> :
                            <>
                            {Object.keys(scheduleData).length > 0 &&
                                Object.keys(scheduleData.schedule).map((day) => {
                                    const daydate = scheduleData.schedule[day];
                                    return (
                                    <GameOfDayContainer>
                                        {Object.keys(daydate).length > 0 &&
                                        <>
                                            {daydate.games.length > 0 &&
                                            <DayDate>{convertDate(daydate.games[0].date)}</DayDate>
                                            }
                                        </>
                                        }
                                        <GameOfDay>
                                        {daydate.games !== undefined &&
                                        daydate.games.map((game) => {
                                            return (
                                                <GameContainer>
                                                    <GameTime>
                                                        <p>{convertTime(game.date)}</p>
                                                    </GameTime>
                                                    {game.competitions[0].competitors.map((team) => {
                                                        return (
                                                            <Team>
                                                                <TeamLogo src={team.team.logo} />
                                                                <TeamInfo>
                                                                    <TeamName>{team.team.displayName}</TeamName>
                                                                    <TeamRecord>{team.homeAway}</TeamRecord>
                                                                </TeamInfo>
                                                            </Team>
                                                        )
                                                    })}
                                                    
                                                </GameContainer>
                                            )
                                        })}
                                        </GameOfDay>
                                    </GameOfDayContainer>
                                    )
                                })
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

const GameOfDayContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const GameOfDay = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const GameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 25px;
    width: calc(100% - 15px);
    height: 65px;
    padding-left: 15px;
    justify-content: space-between;
    background-color: white;
    border-radius: 8px;
`


const DayDate = styled.h2`

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

const TimeContainer = styled.div`
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

const Team = styled.div`
    display: flex;
    align-items: center;
    width: 70%;
    gap: 10px;
`

const GameTime = styled.div`
    display: flex;
    width: 25%;
` 

const TeamName = styled.p`
    font-weight: bold;
`

const TeamLogo = styled.img`
    width: 50px;
    height: 50px;
`

const TeamRecord = styled.p`
    font-style: italic;
    color: grey;
    font-size: 0.9em;
`

const TeamInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
`


export default Schedule;
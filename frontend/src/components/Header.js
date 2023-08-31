import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { COLORS } from "../Constants";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { LeagueContext } from "../context/LeagueContext";
import ScoreBoxSmall from "./ScoreBoxSmall";

const Header = () => {
    const [selectedLeague, setSelectedLeague] = useState('mlb');
    const [selectedSport, setSelectedSport] = useState('baseball');
    const [scoreboard, setScoreboard] = useState([]);
    const {state, updateLeague} = useContext(LeagueContext);

    const handleLeagueSelect = (e) => {
        const league = e.target.value;
        e.stopPropagation();
        setSelectedLeague(league);

        if (league === 'nfl'){
            setSelectedSport('football');
        } else if (league === 'nhl'){
            setSelectedSport('hockey');
        } else if (league === 'nba'){
            setSelectedSport('basketball');
        } else if (league === 'mlb'){
            setSelectedSport('baseball');
        }
    }

    const handleScroll = (e) => {
        
    };

    useEffect(() => {
        const fetchScoreboard = async () => {
            try {
                const response = await fetch('/scoreboard');
                const data = await response.json();
                setScoreboard(data.data);
            } catch(err) {
                console.log(err.message)
            }
        };

        fetchScoreboard();
    }, [selectedLeague])


    return (
        <Wrapper onScroll={(e) => handleScroll(e)}>
            <Container>
                <DropdownContainer>
                    <select name="league" defaultValue={"mlb"} id="league" onChange={(e) => handleLeagueSelect(e)}>
                        <option value="nhl">NHL</option>
                        <option value="nfl">NFL</option>
                        <option value="nba">NBA</option>
                        <option value="mlb">MLB</option>
                    </select>
                </DropdownContainer>

                <ScoreboardContainer>
                    <Scoreboard>
                            {Object.keys(scoreboard).length > 0 && scoreboard.sports.map((sport) => sport.slug === selectedSport && true).includes(true) ?
                            scoreboard.sports.map((sport) => {
                                if(sport.leagues.length > 0){
                                    return sport.leagues.map((league) => {
                                    if (league.slug === selectedLeague){
                                        return league.events.map((event) => <ScoreBoxSmall game={event} />)       
                                    }
                                    })
                                }
                            })
                            : Object.keys(scoreboard).length === 0 || !scoreboard.sports.map((sport) => sport.slug === selectedSport && true).includes(true) &&
                                <NoData>No data available</NoData>
                            }
                        </Scoreboard>
                </ScoreboardContainer>
            </Container>
                {/* <NavList>
                    <MenuLink><MenuItem>NHL</MenuItem></MenuLink>
                    <MenuLink><MenuItem>NFL</MenuItem></MenuLink>
                    <MenuLink><MenuItem>NBA</MenuItem></MenuLink>
                    <MenuLink><MenuItem>MLB</MenuItem></MenuLink>
                </NavList> */}
        </Wrapper>
    )
};


const Wrapper = styled.nav`
    display: flex;
    align-items: center;
    height: 70px;
    width: 85%;
    background-color: ${COLORS.secondThree};
    position: fixed;
    overflow-x: scroll;
`

const Container = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
`

const DropdownContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${COLORS.secondThree};
    width: 100px;
    height: 70px;
    padding-left: 10px;
    position: fixed;
    z-index: 100;
`

const Scoreboard = styled.div`
    display: flex;
    width: 100%;
    gap: 12px;
`

const ScoreboardContainer = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    left: 130px;
`

const NoData = styled.p`
    font-style: italic;
    color: grey;
`

const NavList = styled.ul`
    display: flex;
    gap: 40px;
    height: 100%;
`

const MenuItem = styled.li`
    display: flex;
    align-items: center;
    gap: 20px;
    width: calc(100% - 40px);
    padding: 0 20px;
`

const MenuLink = styled(NavLink)`
    display: flex;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    border-bottom: 2.5px solid transparent;
    margin-top: 2.5px;

    &:hover, &:focus{
        border-bottom: 2.5px solid ${COLORS.primary};
        padding: 0;
    }

    &:active{

    }
`

export default Header
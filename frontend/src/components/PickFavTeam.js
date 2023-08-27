import { Content, Wrapper } from "./Homepage";
import { UserContext } from "../context/UserContext";
import { useContext, useState, useEffect } from "react";
import { COLORS } from "../Constants";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const PickFavTeam = () => {
    const {user, updateUser} = useContext(UserContext);
    const [selectedLeague, setSelectedLeague] = useState({});
    const [teams, setTeams] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const navigate = useNavigate();

    console.log(user)

    // set users favorite teams on load
    useEffect(() => {
        if (user.favoriteTeams){
            setSelectedTeams(user.favoriteTeams);
        };
    }, [])

    const handleChange = (e) => {
        const league = e.target.value.toLowerCase();

        if (league === 'nfl'){
            setSelectedLeague({sport: 'football', league: league});
        } else if (league === 'nhl'){
            setSelectedLeague({sport: 'hockey', league: league});
        } else if (league === 'nba'){
            setSelectedLeague({sport: 'basketball', league: league});
        } else if (league === 'mlb'){
            setSelectedLeague({sport: 'baseball', league: league});
        }
    }

    const handleSubmit = async () => {
        try {
            const request = await fetch('/users', {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    _id: user._id,
                    favoriteTeams: selectedTeams
                })
            });

            const response = await request.json();

            if (response.status === 200){
                updateUser(response.data)
                navigate('/');
            } else {
                throw new Error();
            }

        } catch(err){
            console.log(err.message)
        }
    };

    const handleTeamClick = (team) => {
        console.log(team);
        let isSelected = false;
        let teamIndex;

        selectedTeams.map((selectedTeam, index) => {
            if (selectedTeam.slug === team.slug){
                isSelected = true;
                teamIndex = index;
            }
        });


        if (isSelected){
            let newSelectedTeams = [...selectedTeams];
            newSelectedTeams.splice(teamIndex, 1);
            setSelectedTeams(newSelectedTeams);
        } else {
            setSelectedTeams([...selectedTeams, {...team, league: selectedLeague}])

        }
    };

    const isTeamSelected = (team) => {
        let selected = false;

        selectedTeams.map((selectedTeam) => {
            if (selectedTeam.slug === team.slug){
                selected = true
            }
        })
        
        console.log(selected)

        return selected;
    };

    useEffect(() => {
        const fetchTeams = async () => {
            if (Object.keys(selectedLeague).length > 0){
                try {
                    const response = await fetch(`/teams?league=${selectedLeague.league}&sport=${selectedLeague.sport}`);
                    const data = await response.json();
                    setTeams(data.data);
                } catch(err){
                    console.log(err.message)
                }
            } else {
                setTeams([]);
            }
        }

        fetchTeams();

    }, [selectedLeague])

    return (
        <Wrapper>
            <Content>
                <h1>Pick your favorite team</h1>
                <h2>Leagues</h2>
                <label>
                    Select a league
                    <select defaultValue={""} onChange={(e) => handleChange(e)}>
                        <option value="" >Select a league</option>
                        <option>MLB</option>
                        <option>NHL</option>
                        <option>NFL</option>
                        <option>NBA</option>
                    </select>
                </label>
                {teams.length > 0 &&
                <>
                    <h2>Teams</h2>
                    <Teams>
                        {teams.map((team) => {
                            return(
                                <TeamContainer key={team.id} onClick={() => handleTeamClick(team)} isSelected={() => isTeamSelected(team)}>
                                    <TeamLogo src={team.logos[0].href} />
                                    <TeamName>{team.displayName}</TeamName>
                                </TeamContainer>
                            )
                        })}
                    </Teams>
                </>
                }

                <Buttons>
                    <ConfirmButton type="submit" disabled={selectedTeams.length === 0}  onClick={() => handleSubmit()}>Confirm</ConfirmButton>
                    <SkipButton onClick={() => navigate('/')}>Do it later</SkipButton>
                </Buttons>
            </Content>
        </Wrapper>
    )
}


const Teams = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    gap: 30px;
`


const TeamContainer = styled.button`
    background-color: ${props => props.isSelected === true ? `${COLORS.primary}` : `${COLORS.secondOne}`};
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 8px;
    padding: 10px;
    margin: 0 auto;
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
    border: none;

    &:hover{
        transform: scale(1.1);
    }

    &:focus{
        outline: 2px solid ${COLORS.primary}
    }
`

const TeamName = styled.p`
    color: grey;
    margin: 10px 0;
`

const TeamLogo = styled.img`
    width: 90px;
`

const Buttons = styled.div`
    display: flex;
    gap: 20px;
`

const ConfirmButton = styled.button`
    cursor: pointer;
    background-color: ${COLORS.primary};
    border-radius: 6px;
    border: none;
    width: 75px;
    height: 35px;
    color: white;


    &:hover, &:focus{
        background-color: ${COLORS.primaryHover};
    }

    &:disabled{
        background-color: lightgrey;
        color: grey;
        cursor: default;
    }
`

const SkipButton = styled.button`
    background-color: transparent;
    color: grey;
    border: none;
    cursor: pointer;
`



export default PickFavTeam;
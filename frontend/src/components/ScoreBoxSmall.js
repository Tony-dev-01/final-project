import { styled } from "styled-components";
import { COLORS } from "../Constants";
import { format, compareAsc } from 'date-fns';

const ScoreBox = ({game}) => {

    const convertDate = (date) => {
        const month = format(new Date(date), 'MMM');
        const day = format(new Date(date), 'd');
        const year = format(new Date(date), 'y')
        const dayOfWeek = format(new Date(date), 'cccc');
        return `${dayOfWeek}, ${month} ${day}`;
    };

    return(
        <Wrapper>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingRight: '20px'}}>
            <Container>
                {game.competitors.map((comp) => {
                    return(
                        <TeamContainer>
                            <TeamScore>{comp.score === "" ? 0 : comp.score}</TeamScore>
                            <TeamInfo>
                                <TeamDiv>
                                    <TeamLogo src={comp.logo} />
                                    <p>{comp.name}</p>
                                </TeamDiv>
                                <TeamRecord>{comp.record}</TeamRecord>
                            </TeamInfo>
                        </TeamContainer>
                    )
                })}
            </Container>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', textAlign: 'center', width: '35%'}}>
                {game.fullStatus.type.completed === true ? 
                    <>
                        <p>Final</p>
                        <p style={{fontStyle: 'italic', textAlign: 'center'}}>{convertDate(game.date)}</p>
                    </>
                : <p>{game.fullStatus.type.shortDetail}</p>}
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    background: white;
    border-radius: 8px;
    width: 100%;
    height: 85px;
    padding: 10px 0;
    border-left: 3px solid ${COLORS.primary};
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(60% - 20px);
    padding-left: 20px;
    gap: 10px;
    justify-content: space-between;
`

const TeamContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    gap: 25px;
`

const TeamInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const TeamDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`


const TeamLogo = styled.img`
    width: 20px;
`

const TeamScore = styled.p`
    font-weight: 600;
    font-size: 1.4em;
`

const TeamRecord = styled.p`
    font-size: 0.8em;
    color: grey;
`







export default ScoreBox;
import { styled } from "styled-components";
import { COLORS } from "../Constants";

const ScoreBox = ({game}) => {
    console.log(game)

    return(
        <Wrapper>
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
    justify-content: space-between;
`

const TeamContainer = styled.div`
    display: flex;
    /* flex-direction: column; */
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
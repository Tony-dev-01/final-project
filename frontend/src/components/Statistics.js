import { styled } from "styled-components"
import { Wrapper, Content } from "./Homepage"
import Header from "./Header"
import { useContext, useEffect, useState } from "react"
import { LeagueContext } from "../context/LeagueContext"

const Statistics = () => {
    const [teams, setTeams] = useState({});
    const {state, updateLeague} = useContext(LeagueContext);

    console.log(state)

    console.log(teams)

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
                            <label for="league">Select a league</label>
                                <select name="league" id="league">
                                    <option value="mlb">NHL</option>
                                    <option value="mlb">NFL</option>
                                    <option value="mlb">NBA</option>
                                    <option value="mlb">MLB</option>
                                </select>
                        </TopBar>
                    </Container>
                </Section>
            </Content>
        </Wrapper>
    )
}


const Section = styled.div`
    display: flex;
`

const Container = styled.div`
    display: flex;
`

const TopBar = styled.div`
    display: flex;
`


export default Statistics
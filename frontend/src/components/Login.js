import { styled } from "styled-components";
import { COLORS } from "../Constants";
import PrimaryButton from "./PrimaryButton";
import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../context/UserContext";

const handleSubmit = async (e, logInfo, setErrorMessage, navigate, setUser) => {
    e.preventDefault();

    const verifyInfo = () => {
        Object.values(logInfo).map((value) => {
            if (value.includes('{') || value.includes('"') || value.includes("'") || value.includes('<') || value.includes('[')){
                return setErrorMessage('Not a valid username/password.')
            } else {
                setErrorMessage('')
            }
        })
    };

    try {
        await verifyInfo();

        const request = await fetch(`/users?userName=${logInfo.userName}&password=${logInfo.password}`);

        const response = await request.json();

        if (response.status === 200){
            window.sessionStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data)
            navigate('/');
        } else if (response.status === 404) {
            throw new Error(response.message)
        }
    } catch(err){
        setErrorMessage(err.message)
    }

};


const Login = () => {
    const formRef = useRef();
    const [logInfo, setLogInfo] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        if (value.length === 0){
            let newLogInfo = {...logInfo};
            delete newLogInfo[key]
            setLogInfo({
                ...newLogInfo
            })
        } else {
            setLogInfo({
                ...logInfo,
                [key]: value
            })
        }
    };


    return (
        <Wrapper>
                <Container>
                    {user ? () => navigate('/') :
                    <>
                        <h1>Login</h1>

                        <StyledForm onSubmit={(e) => handleSubmit(e, logInfo, setErrorMessage, navigate, setUser)}>
                            <StyledRow>
                                <StyledLabel for='userName'>Username</StyledLabel>
                                <StyledInput type="text" ref={formRef} placeholder="username" name="userName" required={true} onChange={handleChange}/>
                            </StyledRow>

                            <StyledRow>
                                <StyledLabel for='password'>Password</StyledLabel>
                                <StyledInput type="password" placeholder="password" name="password" required={true} onChange={handleChange}/>
                            </StyledRow>
                            {errorMessage.length > 0 &&
                                <ErrorBox>
                                    <ErrorMessage>Error : {errorMessage}</ErrorMessage>
                                </ErrorBox>
                            }

                            <PrimaryButton type="submit" text='Sign in' width="100%" disabled={Object.keys(logInfo).length < 2} />
                            <ToCreate>Don't have an account? <Link to="/create-account" style={{color: '#1663ab'}}>Create one here</Link></ToCreate>
                        </StyledForm>
                    </>
                    }
                </Container>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    width: 100%;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: calc(100% - 50px);
    background-color: ${COLORS.secondOne};
    height: fit-content;
    padding: 25px 25px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
`

const StyledRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
`

const StyledLabel = styled.label`
`

const StyledInput = styled.input`
    height: 25px;
    /* border: none;
    border-bottom: 2px solid ${COLORS.primary};
    background: transparent; */
    width: calc(100% - 8px);
    margin: 0;
    font-size: 0.95em;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 35%;
`

const ToCreate = styled.p`
    font-size: 0.9em;
`

const ErrorBox = styled.div`
    display: flex;
    align-items: center;
    border: 2px solid darkred;
    width: 100%;
    margin-bottom: 0;
    height: 50px;
`

const ErrorMessage = styled.p`
    padding-left: 10px;
    color: darkred;
`





export default Login;
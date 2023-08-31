import { styled } from "styled-components";
import { COLORS } from "../Constants";
import PrimaryButton from "./PrimaryButton";
import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../context/UserContext";

const handleSubmit = async (e, userInfo, setErrorMessage, navigate, setUser) => {
    e.preventDefault();

    const verifyInfo = () => {
        if (userInfo.password !== userInfo.confirmPassword){
            return setErrorMessage('Your password does not match.')
        } else if (userInfo.password.length < 6){
            return setErrorMessage('New password must contain at least 6 characters.')
        }

        Object.values(userInfo).map((value) => {
            if (value.includes('{') || value.includes('"') || value.includes("'") || value.includes('<') || value.includes('[')){
                return setErrorMessage('Please use letters, numbers and/or special characters.')
            } else {
                setErrorMessage('');
                delete userInfo.confirmPassword;
            }
        });
    }

    try {
        await verifyInfo();

        const request = await fetch('/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })

        const response = await request.json();

        if (response.status === 201){
            window.sessionStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            navigate('/profile/pick-team');
        }
    } catch (err){
        console.log(err);
        setErrorMessage(err.message);
    }
};

const CreateAccount = () => {
    const formRef = useRef();
    const [userInfo, setuserInfo] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        if (value.length === 0){
            let newuserInfo = {...userInfo};
            delete newuserInfo[key]
            setuserInfo({
                ...newuserInfo
            })
        } else {
            setuserInfo({
                ...userInfo,
                [key]: value
            })
        }
    };


    return (
        <Wrapper>
                <Container>
                    <h1>Create Account</h1>

                    <StyledForm onSubmit={(e) => handleSubmit(e, userInfo, setErrorMessage, navigate, setUser)}>
                        <StyledRow>
                            <StyledLabel for='fullName'>Full Name</StyledLabel>
                            <StyledInput type="text" ref={formRef} placeholder="full name" name="fullName" required={true} onChange={handleChange}/>
                        </StyledRow>
                        
                        <StyledRow>
                            <StyledLabel for='userName'>Username</StyledLabel>
                            <StyledInput type="text" ref={formRef} placeholder="username" name="userName" required={true} onChange={handleChange}/>
                        </StyledRow>

                        <StyledRow>
                            <StyledLabel for='email'>Email</StyledLabel>
                            <StyledInput type="email" ref={formRef} placeholder="email" name="email" required={true} onChange={handleChange}/>
                        </StyledRow>

                        <StyledRow>
                            <StyledLabel for='password'>Password</StyledLabel>
                            <StyledInput type="password" placeholder="password" name="password" required={true} onChange={handleChange}/>
                        </StyledRow>

                        <StyledRow>
                            <StyledLabel for='confirmPassword'>Confirm Password</StyledLabel>
                            <StyledInput type="password" placeholder="confirm password" name="confirmPassword" required={true} onChange={handleChange}/>
                        </StyledRow>
                        {errorMessage.length > 0 &&
                            <ErrorBox>
                                <ErrorMessage>Error : {errorMessage}</ErrorMessage>
                            </ErrorBox>
                        }

                        <PrimaryButton type="submit" text='Sign up' width="100%" disabled={Object.keys(userInfo).length < 5} />
                        <ToCreate>Already have an account? <Link to="/login" style={{color: '#1663ab'}}>Sign in</Link></ToCreate>
                    </StyledForm>

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

export default CreateAccount;
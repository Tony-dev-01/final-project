import { Content, Wrapper } from "./Homepage";
import { styled } from "styled-components";
import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";
import { COLORS } from "../Constants";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const {user, updateUser, disconnectUser, setUser, deleteUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [userInfo, setuserInfo] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [del, setDel] = useState(false);

    console.log(user)
    console.log(userInfo)

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


    const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('submit')

    const verifyInfo = () => {
        if (userInfo.currentPassword !== undefined && userInfo.currentPassword !== user.password){
            return setErrorMessage('Your current password is incorrect.')
        } else if (userInfo.newPassword !== undefined && userInfo.newPassword.length < 6){
            return setErrorMessage('New password must contain at least 6 characters.')
        } else if (userInfo.currentPassword !== undefined && userInfo.newPassword === undefined){
            return setErrorMessage('Please enter a new password');
        } else if (userInfo.currentPassword !== undefined && userInfo.newPassword !== undefined && userInfo.confirmNewPassword === undefined){
            return setErrorMessage('Please confirm your new password');
        } else if (userInfo.newPassword !== undefined && userInfo.newPassword !== userInfo.confirmNewPassword){
            return setErrorMessage('Your new password does not match.')
        }

        Object.values(userInfo).map((value) => {
            console.log(value)
            if (value.includes('{') || value.includes('"') || value.includes("'") || value.includes('<') || value.includes('[')){
                return setErrorMessage('Please use letters, numbers and/or special characters.')
            } else {
                setErrorMessage('');
                delete userInfo.confirmPassword;
            }
        });
    };


    try {
        await verifyInfo();

        const newInfo = {...userInfo, _id: user._id};

        if (Object.keys(userInfo).includes('newPassword')){
            delete newInfo['confirmPassword'];
            delete newInfo['currentPassword'];
        }

        const request = await fetch('/users', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newInfo)
        })

        const response = await request.json();

        if (response.status === 200){
            // window.sessionStorage.setItem('user', JSON.stringify(response.data));
            updateUser(response.data);
            window.location.reload();
            // navigate('/profile/pick-team');
        }
    } catch (err){
        console.log(err);
        setErrorMessage(err.message);
    }
};

    const handleLogOut = () => {
        disconnectUser();
        setUser();
        navigate('/');
    };
    

    const handleDelete = async () => {

        try {
            const request = await fetch(`/users/${user._id}`, {
                method: 'DELETE',
                headers:{
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            });

            const response = await request.json();

            if (response.status === 400){
                throw new Error(response.message);
            } else {
                setDel(false);
                disconnectUser();
                window.sessionStorage.clear();
                setUser();
                navigate('/');
            }

        } catch(err) {
            console.log(err);
            setErrorMessage(err.message);
        }

    };

    return (
        <>
        {Object.keys(user).length == 0 || user === undefined ? navigate('/') : 
        <Wrapper>
            {del && 
            <DeleteOverlay>
                <DeleteContainer>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                    <p>Are you sure you want to delete your account?</p>
                    <ButtonsContainer style={{width: '100%'}}>
                        <PrimaryButton text={'Cancel'} clickFunc={() => setDel(false)} />
                        <SecondaryButton text={'Delete Account'} clickFunc={() => handleDelete()}/>
                    </ButtonsContainer>
                    </div>
                </DeleteContainer>
            </DeleteOverlay>
            }
            <Content>
                <h1>Profile</h1>
                <MainContent>
                    <ProfileContainer>
                        <ProfileInfo>
                            <ProfilePic><p>No image</p></ProfilePic>
                            <h2>{user.userName}</h2>
                        </ProfileInfo>

                        <ButtonsContainer>
                            <PrimaryButton text={'Change teams'} clickFunc={() => navigate('/profile/pick-team')} />
                            <SecondaryButton text={'Log out'} clickFunc={() => handleLogOut()}/>
                        </ButtonsContainer>
                    </ProfileContainer>

                    <InfoContainer>
                        <h2>User Information</h2>
                        <StyledForm onSubmit={(e) => handleSubmit(e)}>
                        <UserInfoContainer>
                        <NewInfoContainer>
                        <StyledRow>
                            <StyledColumn>
                                <StyledLabel htmlFor='fullName'>New Full Name</StyledLabel>
                                <StyledInput type="text" placeholder="full name" name="fullName" required={false} onChange={handleChange}/>
                            </StyledColumn>
                        </StyledRow>
                        
                        <StyledRow>
                            <StyledColumn>
                                <StyledLabel htmlFor='userName'>New Username</StyledLabel>
                                <StyledInput type="text" placeholder="username" name="userName" required={false} onChange={handleChange}/>
                            </StyledColumn>
                        </StyledRow>

                        <StyledRow>
                            <StyledColumn>
                                <StyledLabel htmlFor='email'>New Email</StyledLabel>
                                <StyledInput type="email" placeholder="email" name="email" required={false} onChange={handleChange}/>
                            </StyledColumn>
                        </StyledRow>

                        <StyledRow>
                            <StyledColumn>
                                <StyledLabel htmlFor='currentPassword'>Current Password</StyledLabel>
                                <StyledInput type="password" placeholder="current password" name="currentPassword" required={false} onChange={handleChange}/>
                            </StyledColumn>
                        </StyledRow>

                        <StyledRow>
                            <StyledColumn>
                                <StyledLabel htmlFor='newPassword'>New Password</StyledLabel>
                                <StyledInput type="password" placeholder="new password" name="newPassword" onChange={handleChange}/>
                            </StyledColumn>
                        </StyledRow>

                        <StyledRow>
                            <StyledColumn>
                                <StyledLabel htmlFor='confirmNewPassword'>Confirm New Password</StyledLabel>
                                <StyledInput type="password" placeholder="confirm new password" name="confirmNewPassword" onChange={handleChange}/>
                            </StyledColumn>
                        </StyledRow>
                        {errorMessage.length > 0 &&
                            <ErrorBox>
                                <ErrorMessage>Error : {errorMessage}</ErrorMessage>
                            </ErrorBox>
                        }
                        </NewInfoContainer>
                        <CurrentUserInfo>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                                <h4>Current User Information</h4>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                                    <p><span style={{fontWeight: 'bold'}}>Full name:</span> {user.fullName}</p>
                                    <p><span style={{fontWeight: 'bold'}}>Username:</span> {user.userName}</p>
                                    <p><span style={{fontWeight: 'bold'}}>Email:</span> {user.email}</p>
                                </div>
                            </div>
                        </CurrentUserInfo>
                    </UserInfoContainer>
                        <ButtonsContainer>
                            <PrimaryButton type='submit' text={'Update Info'}  disabled={Object.keys(userInfo).length === 0} />
                            <SecondaryButton type='button' text={'Delete account'} clickFunc={() => setDel(true)}/>
                        </ButtonsContainer>
                    </StyledForm>
                    </InfoContainer>
                </MainContent>
            </Content>
        </Wrapper>
        }
        </>
    )
};

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 30px;
`

const ProfileContainer = styled.div`
    display: flex;
    border-radius: 8px;
    width: calc(100% - 40px);
    background-color: ${COLORS.secondOne};
    padding: 10px 20px;
    align-items: center;
    justify-content: space-between;
`

const ProfileInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
`

const ProfilePic = styled.div`
    border-radius: 50px;
    background-color: lightgrey;
    height: 70px;
    width: 70px;
    text-align: center;
    color: grey;
    font-style: italic;
    font-size: 0.9em;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ButtonsContainer = styled.div`
    display: flex;
    gap: 10px;
    width: 25%;
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Infos = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: calc(100% - 40px);
    gap: 10px;
    border-radius: 8px;
    background-color: ${COLORS.secondOne};
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
    /* align-items: center; */
`

const NewInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 70%;
`

const UserInfoContainer = styled.div`
    display: flex;
    width: 100%;
    gap: 40px;
    justify-content: space-between;
`

const CurrentUserInfo = styled.div`
    display: flex;
    width: calc(100% - 20px);
    background-color: white;
    border-radius: 8px;
    padding: 10px;
    
`

const StyledRow = styled.div`
    display: flex;
    /* flex-direction: column; */
    justify-content: space-between;
    align-items: center;
    /* gap: 5px; */
    width: 100%;
`

const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
`




const StyledLabel = styled.label`
    font-size: 1em;
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

const DeleteOverlay = styled.div`
    display: flex;
    z-index: 9000;
    background: hsl(0, 100%, 0%, 0.7);
    width: 100vw;
    height: 100vh;
    position: fixed;
    justify-content: center;
    align-items: center;
`


const DeleteContainer = styled.div`
    display: flex;
    z-index: 9000;
    background: ${COLORS.secondOne};
    width: 500px;
    height: 150px;
    position: fixed;
    top: calc(50% - 75px);
    left: calc(50% - 250px);
    justify-content: center;
    align-items: center;
`




export default Profile;
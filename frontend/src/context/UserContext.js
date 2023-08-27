import { createContext, useReducer, useState } from "react";

export const UserContext = createContext();


const initalState = {

};


const reducer = (state, action) => {
    switch(action.type){
        case 'disconnect-user':
            return window.sessionStorage.clear();
        case 'update-user':
            window.sessionStorage.clear();
            return window.sessionStorage.setItem('user', JSON.stringify(action.payload));
        default:
            throw new Error('Not a valid action type.');
    }
};

export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initalState);
    const [user, setUser] = useState(() => {
        const user = JSON.parse(window.sessionStorage.getItem('user'));

        console.log(user)

        if (user){
            return user;
        } else {
            return null;
        }
    })

    const updateUser = (user) => {
        dispatch({
            type: 'update-user',
            payload: user
        })
    };

    const disconnectUser = () => {
        dispatch({
            type: 'disconnect-user'
        })
    };


    return(
        <UserContext.Provider value={{user, setUser, updateUser, disconnectUser}}>
            {children}
        </UserContext.Provider>
    )
}



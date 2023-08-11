import { createContext, useReducer } from "react";

export const LeagueContext = createContext();

const initialState = {
    league: 'MLB',
    sport: 'Baseball'
};

const reducer = (state, action) => {
    switch (action.type){
        case 'update-league':
            return {league: action.payload.league, sport: action.payload.sport}
    }
};

export const LeagueContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const updateLeague = (data) => {
        dispatch({
            type: 'update-league',
            payload: data
        })
    };

    return (
        <LeagueContext.Provider value={{state, updateLeague}}>
            {children}
        </LeagueContext.Provider>
    )
}
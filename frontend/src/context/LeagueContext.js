import { createContext, useEffect, useReducer, useState } from "react";

export const LeagueContext = createContext();

const initialState = {

};

const reducer = (state, action) => {
    switch (action.type){
        case 'update-league':
            console.log(action.payload)
            return {league: action.payload.league, sport: action.payload.sport, data: action.payload.data};
        case 'league-info':
            return {...state, data: action.payload}
        default:
            throw new Error('No a valid action type.');
    }
};

export const LeagueContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // useEffect(() => {
    //     const fetchLeagueInfo = async () => {
    //         try {
    //             const request = await fetch(`/teams?league=${info.league}&sport=${info.sport}`);
    //             const data = await request.json();

    //             console.log(info.league)
    //             setLeagueData({data: data, league: info.league, sport: info.sport})

    //         } catch(err){
    //             console.log(err.message);
    //         }
    //     };

    //     fetchLeagueInfo();

    // }, [info])


    // const fetchLeagueInfo = (data) => {
    //     dispatch({
    //         type: 'league-info',
    //         payload: data
    //     })
    // }

    const updateLeague = async (data) => {
        // setInfo(data)

        try {
                const request = await fetch(`/teams?league=${data.league}&sport=${data.sport}`);
                const info = await request.json();

                dispatch({
                    type: 'update-league',
                    payload: {data: info.data, league: data.league, sport: data.sport}
                })
                // console.log(info.league)
                // setLeagueData({data: data, league: info.league, sport: info.sport})

            } catch(err){
                console.log(err.message);
            }
        
        
    };

    return (
        <LeagueContext.Provider value={{state, updateLeague}}>
            {children}
        </LeagueContext.Provider>
    )
}
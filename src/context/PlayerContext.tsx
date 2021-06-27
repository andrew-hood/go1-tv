import React, { useState, createContext } from 'react';

const PlayerContext = createContext({});

function PlayerProvider(props: any){
	
	const [state, setState] = useState([]);
	
	return(
		<PlayerContext.Provider value={[state,setState]}>
			{props.children}
		</PlayerContext.Provider>
	);
}

export { PlayerContext, PlayerProvider };
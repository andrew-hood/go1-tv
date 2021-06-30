import { View, IFrame, Text } from '@go1d/go1d';
import { useContext } from 'react';
import { store } from '../../store/store';
import Drawer from '../Drawer';

function Player() {
  const {
    state: { player },
  } = useContext(store);

  return (
    <>
      {player.link ? (
        <IFrame 
          width="100%"
          height="100%" 
          url={player.link}
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen 
        />
      ) : (
        <View height="100%" alignItems="center" justifyContent="center">
          <img src="./keyboard.svg" />
          <Text>Use the arrow keys to browse content</Text>
        </View>
      )}
      <Drawer />
    </>
  )
}
export default Player;
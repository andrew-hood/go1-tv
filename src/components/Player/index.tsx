import { View, IFrame, Text, Avatar, Modal, ButtonMinimal, ButtonFilled, UL, LI, SpotIcon } from '@go1d/go1d';
import IconGo1Logo from '@go1d/go1d/build/components/Icons/Go1Logo';
import { useContext, useEffect } from 'react';
import { useModal } from 'react-modal-hook';
import { store } from '../../store/store';

function Player() {
  const {
    state: { player, account },
  } = useContext(store);

  const [showModal, hideModal] = useModal(() => (
    <Modal 
      maxWidth="100%" 
      minHeight="100vh"
      isOpen 
      contentPadding={0}
      borderRadius={0}
      css={{
        margin: 0
      }}
    >
      <View flexDirection="row" height="100%">
        <View backgroundColor="accent" width="55%" padding={4} justifyContent="center">
          <SpotIcon size={8} name="TechnologySkills" color="complementary" marginX="auto" />
          <UL
            fontSize={3}
            iconColor="complementary"
            color="background"
          >
            <LI>Access all your learning content</LI>
            <LI>Simple and intuitive navigation</LI>
            <LI>Designed for use on TV</LI>
          </UL>
        </View>
        <View flexGrow={1} padding={7} alignItems="center">
          <IconGo1Logo size={10} color="accent" />
          <View flexGrow={1} />
          <ButtonFilled color="complementary" href="https://auth.go1.com/oauth/authorize?response_type=token&client_id=60553336900dd07cb05d3e8d41eb1e2253d3fbf1&redirect_uri=https://go1-tv-app.onrender.com/&scope=user.read user.write user.login.me account.read lo.read enrollment.read enrollment.write">Login to your Go1 account</ButtonFilled>
        </View>
      </View>
    </Modal>
  ));

  useEffect(() => {
    !account ? showModal() : hideModal();
  }, [account]);

  return (
    <View width="100%" height="100vh" flexDirection="row">
      <View width="100px" padding={4} backgroundColor="accent" alignItems="center">
        <IconGo1Logo
          color="complementary"
          size={7}
        />
        <View flexGrow={1} />
        {account && (
          <Avatar
            placeHolderVisibilityType="text"
            scaleSize={3}
            onClick={showModal}
          />
        )}
      </View>
      <View height="100%" flexGrow={1}>
        {player.link ? (
          <IFrame id="player" width="100%" height="100%" url={player.link} frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        ) : (
          <View height="100%" alignItems="center" justifyContent="center">
            <img src="./keyboard.svg" />
            <Text>Use the arrow keys to browse content</Text>
          </View>
        )}
      </View>
    </View>
  )
}
export default Player;
import { View, Card, Heading } from '@go1d/go1d';
import { useContext, useEffect } from 'react';
import useIncrementIndex from '../../hooks/useIncrementIndex';
import useKeyPress from '../../hooks/useKeyPress';
import { getLoginLink } from '../../services/go1';
import { store } from '../../store/store';
import { ActionType } from '../../store/store.actions';

function Carousel({ title, items, onSelected }: { title: string, items: any[], onSelected: boolean }) {
  const {
    state: { account, token },
    dispatch
  } = useContext(store);
  const [xCursorPosition, setIsEnabled] = useIncrementIndex(['ArrowLeft', 'ArrowRight'], false, 0, items.length);

  const width = 180;

  useEffect(() => {
    setIsEnabled(onSelected);
  }, [onSelected]);

  useKeyPress('Enter', () => {
    if (onSelected) {
      const id = items[xCursorPosition].node.id;
      const url = `https://${account.portal.url}/play/${id}?exit=0&autoPlay=1`;
      getLoginLink(url, token).then(link => {
        console.log(link);
        dispatch({type: ActionType.PlayerUpdate, payload: { link }});
      })
    }
  });

  const formatDuration = (mins: number): string => {
    if (mins < 60) return `${mins} mins`;
    const hrs = Math.floor(mins / 60);
    return hrs === 1 ? `${hrs} hr` : `${hrs} hrs`;
  }

  return (
    <View marginBottom={4} paddingX={4}>
      <Heading semanticElement="h2" visualHeadingLevel="Heading 2" color="background" marginBottom={3}>
        {title}
      </Heading>
      <View 
        flexDirection="row" 
        css={{ 
          position: 'relative', 
          left: -(xCursorPosition * width),
          transition: 'left linear 0.2s'
        }}
      >
        {items.map((item, columnIndex) => (
          <View width={width}>
            <Card
              css={{
                transition: 'linear 0.2s'
              }}
              border={2}
              borderColor={(onSelected && columnIndex === xCursorPosition) ? 'contrast' : 'transparent'}
              mode="dark"
              backgroundOpacity="feedback"
              width="auto"
              height={260}
              metadata={[
                item.node.type,
                formatDuration(item.node.duration)
              ]}
              thumbnail={item.node.image}
              title={item.node.title}
              type="course"
            />
          </View>
        ))}
      </View>
    </View>
  )
}
export default Carousel;
import { View, Card, Heading } from '@go1d/go1d';

function Carousel({ title, items, xCursorPosition, onSelected }: { title: string, items: any[], xCursorPosition: number, onSelected: boolean }) {
  const width = 180;

  return (
    <View marginBottom={4} paddingX={4}>
      <Heading semanticElement="h4" visualHeadingLevel="Heading 4" color="contrast" marginBottom={3}>
        {title}
      </Heading>
      <View 
        flexDirection="row"
        height={200}
        css={onSelected && { 
          position: 'relative',
          transform: `translateX(${-(xCursorPosition * width)}px)`,
          transition: 'transform ease-in-out 250ms',
          willChange: 'transform'
        }}
      >
        {items.map((item, columnIndex) => (
          <View width={width}>
            <Card
              border={2}
              borderColor={(onSelected && columnIndex === xCursorPosition) ? 'contrast' : 'transparent'}
              mode="dark"
              backgroundOpacity="feedback"
              width="auto"
              height={182}
              thumbnail={item.node.image}
            />
          </View>
        ))}
      </View>
    </View>
  )
}
export default Carousel;
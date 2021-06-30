import { useQuery } from "@apollo/client";
import { View, Heading, Text } from "@go1d/go1d";
import get from "lodash/get";
import { useEffect, useState } from "react";
import useIncrementIndex from "../../hooks/useIncrementIndex";
import { TOP_TOPICS } from "../../services/graphql";
import Carousel from "../Carousel/v2";

function Catalog() {
  const { loading, error, data } = useQuery(TOP_TOPICS);
  const [content, setContent] = useState([]);
  const [selected, setSelected] = useState<any>(null);

  const [yCursorPosition,,setYMaxCount] = useIncrementIndex(['ArrowUp', 'ArrowDown'], true, 0, 0);
  const [xCursorPosition, , setXMaxCount] = useIncrementIndex(['ArrowLeft', 'ArrowRight'], true, 0, 0);

  useEffect(() => {
    if (data) {
      setContent(data.discover.blocks);
      setYMaxCount(data.discover.blocks.length);
      setXMaxCount(data.discover.blocks[yCursorPosition].response.edges.length);

      setSelected(data.discover.blocks[yCursorPosition].response.edges[xCursorPosition].node);
    }
  }, [data, yCursorPosition, xCursorPosition]);

  return (
    <View mode="dark" height="100vh" overflow="hidden" position="relative" width="100%">
      <View height={340}>
        {selected && (
          <View 
            height="100%"
            css={{
              backgroundImage: `linear-gradient(to right, #212B2C 35%, rgba(33, 43, 44, 0.4) 100%), url(${selected.image})`,
              backgroundSize: '80%',
              backgroundPosition: 'right',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <View padding={8} width="60%">
              <Heading semanticElement="h1" visualHeadingLevel="Heading 1" color="contrast" marginBottom={3}>
                {selected.title}
              </Heading>
              <Text>{selected.duration}</Text>
            </View>
          </View>
        )}
      </View>

      <View flexGrow={1} paddingX={7} width="100%" overflow="hidden" position="relative">
        <View 
          css={{
            position: 'relative',
            transform: `translateY(${-(yCursorPosition * (244))}px)`,
            transition: 'transform ease-in-out 250ms',
            willChange: 'transform',
          }}
        >
          {content.map((item, rowIndex) => (
            <Carousel
              title={get(item, 'title', '')}
              items={get(item, 'response.edges', [])}
              xCursorPosition={xCursorPosition}
              onSelected={rowIndex === yCursorPosition}
            />
          ))}
        </View>
      </View>
    </View>
  )
}
export default Catalog;
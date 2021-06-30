import { useQuery } from "@apollo/client";
import { View } from "@go1d/go1d";
import React, { useEffect, useState } from "react";
import useIncrementIndex from "../../hooks/useIncrementIndex";
import Carousel from "../Carousel";
import get from "lodash/get";
import { TOP_TOPICS } from "../../services/graphql";

const MemoCarousel = React.memo(Carousel);

function Drawer () {
  const { loading, error, data } = useQuery(TOP_TOPICS);
  const [content, setContent] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [yCursorPosition,,setMaxCount] = useIncrementIndex(['ArrowUp', 'ArrowDown'], true, -1, 0);

  useEffect(() => {
    if (data) {
      setContent(data.discover.blocks);
      setMaxCount(data.discover.blocks.length);
    }
  }, [data]);

  useEffect(() => {
    setDrawerVisible(yCursorPosition >= 0);
  }, [yCursorPosition])

  const height = 322;

  return content.length > 0 ? (
    <View
      css={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: drawerVisible ? 1 : 0,
        visibility: drawerVisible ? 'visible' : 'hidden',
        background: 'linear-gradient(0deg, rgba(33,43,44,1) 15%, rgba(44,61,59,0) 110%)',
        transition: 'opacity ease-in-out 100ms, visibility ease-in-out 0ms 100ms',
        willChange: 'opacity',
      }}
      flexDirection="column-reverse"
      maxHeight="100vh"
    >
      <View height={330} overflow="hidden">
        <View 
          css={{
            position: 'relative',
            transform: `translateY(${-(yCursorPosition * (height))}px)`,
            transition: 'transform ease-in-out 250ms',
            willChange: 'transform',
          }}
        >
          {content.map((item, rowIndex) => (
            <MemoCarousel
              key={rowIndex}
              title={get(item, 'title', '')}
              items={get(item, 'response.edges', [])}
              onSelected={rowIndex === yCursorPosition}
            />
          ))}
        </View>
      </View>
    </View>
  ) : null;
}
export default Drawer;
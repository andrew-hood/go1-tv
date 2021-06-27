import { gql, useQuery } from "@apollo/client";
import { View } from "@go1d/go1d";
import React, { useEffect, useState } from "react";
import useIncrementIndex from "../../hooks/useIncrementIndex";
import Carousel from "../Carousel";
import get from "lodash/get";

const EXCHANGE_RATES = gql`
  query Search {
    discover(blocks: { type: LearningCarousel, data: TOP_TOPICS, names: ["T1", "T2", "T3", "T4", "T5"] }) {
      id,
      blocks {
        ... on LearningCarousel {
          id,
          title,
          response(first: 12, after: "") {
            pageInfo {
              totalCount
            }
            edges {
              node {
                ... on CourseCard {
                  id,
                  type,
                  title,
                  image,
                  duration
                }
              }
            }
          }
        }
      }
    }
  }
`;

const MemoCarousel = React.memo(Carousel);

function Drawer () {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);
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
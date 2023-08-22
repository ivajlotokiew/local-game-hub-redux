import React, { useEffect, useState } from "react";
import { Button, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { GameQuery } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { selectGames } from "../features/games/gameSlice";
import { getGames } from "../features/games/gameSlice";


interface Props {
  gameQuery: GameQuery | null
}

const GAMES_PER_PAGE = 20

const GameGrid = ({ gameQuery }: Props) => {
  const [page, setPage] = useState(0)
  const [endpoint, setEndpoint] = useState('/games')
  const { data: games, error, isLoading, count } = useGames(endpoint, gameQuery)
  const dispatch = useDispatch()
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  const allPages = Math.ceil(count / GAMES_PER_PAGE)
  const nextBtnDisabled = page === allPages || page === 0 && allPages === 1 || Number.isNaN(allPages) ? true : false
  const gms = useSelector(selectGames);
  console.log('Games: ', gms)

  useEffect(() => {
    debugger
    dispatch(getGames())

  }, [])

  useEffect(() => {
    setPage(0)
  }, [gameQuery?.genre])

  useEffect(() => {
    page > 0 ? setEndpoint('/games?page=' + page) : setEndpoint('/games')
  }, [page])

  const setPrevPage = () => {
    setPage(oldPage => oldPage === 2 ? 0 : oldPage - 1)
  }

  const setNextPage = () => {
    setPage(oldPage => oldPage === 0 ? 2 : oldPage + 1)
  }

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} p='10px' spacing={6}>
        {isLoading && skeletons.map(skeleton =>
          <GameCardContainer key={skeleton}>
            <GameCardSkeleton />
          </GameCardContainer>)}
        {gms.map(game =>
          <GameCardContainer key={game.id} >
            <GameCard game={game} />
          </GameCardContainer>
        )}
      </SimpleGrid>
      <HStack justifyContent={"space-evenly"}>
        <Button isDisabled={page === 0 ? true : false} onClick={setPrevPage}>Prev</Button>
        <Text>{page === 0 ? 1 : page} of {Number.isNaN(allPages) ? 1 : allPages}</Text>
        <Button isDisabled={nextBtnDisabled} onClick={setNextPage}>Next</Button>
      </HStack>
    </>
  )
};

export default GameGrid;

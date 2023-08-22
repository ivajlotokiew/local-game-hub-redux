import React from 'react'
import { Genre } from '../hooks/useGenre'
import { Platform } from '../hooks/usePlatforms';
import { HStack, Heading, Text } from '@chakra-ui/react';
import { GameQuery } from '../App';

interface Props {
    gameQuery: GameQuery
}

const GameHeading = ({ gameQuery }: Props) => {
    const heading = `${gameQuery.platform?.name || ''} ${gameQuery.genre?.name || ''} Games`

    return (
        <Heading as='h1' marginY={5} fontSize='5xl'>{heading}</Heading>
    )
}

export default GameHeading
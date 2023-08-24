import React, { useEffect } from 'react'
import { Button, HStack, Heading, Image, List, ListItem, Text } from '@chakra-ui/react'
import getCroppedImgUrl from '../services/image-url'
import { Spinner } from '@chakra-ui/react'
import { Genre } from "../common/types"
import { useDispatch, useSelector } from 'react-redux';
import { selectGenres, selectErrorState, getGenres, selectLoadingState } from '../features/genre/genreSlice';

interface Props {
    onSelectGenre: (genre: Genre) => void;
    selectedGenre: Genre | null
}

const GenreList = ({ onSelectGenre, selectedGenre }: Props) => {
    const dispatch = useDispatch()
    const genres = useSelector(selectGenres)
    const error = useSelector(selectErrorState)
    const isLoading = useSelector(selectLoadingState)

    useEffect(() => {
        dispatch(getGenres("/genres"))
    }, [])

    if (Object.keys(error).length) return null
    if (isLoading) return <Spinner />

    return (
        <>
            <Heading fontSize='2xl' marginBottom={3}>
                Genre
            </Heading>
            <List>
                {genres?.map(genre =>
                    <ListItem key={genre.id} py={1}>
                        <HStack>
                            <Image boxSize='32px' src={getCroppedImgUrl(genre.image_background)} borderRadius={8} />
                            <Button whiteSpace='normal' textAlign='left' fontWeight={genre.id === selectedGenre?.id ? 'bold' : 'normal'}
                                variant='link' fontSize='lg' onClick={() => onSelectGenre(genre)} >{genre.name}</Button>
                        </HStack>
                    </ListItem>
                )}
            </List>
        </>
    )
}

export default GenreList
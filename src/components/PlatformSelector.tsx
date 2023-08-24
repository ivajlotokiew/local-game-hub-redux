import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from "react"
import { BsChevronDown } from 'react-icons/bs'
import { Platform } from '../common/types'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { selectPlatforms, selectErrorState, getPlatforms } from '../features/platform/platformSlice'

interface Props {
    onSelectPlatform: (platform: Platform) => void;
    selectedPlatform: Platform | null;
}

const PlatformSelector = ({ onSelectPlatform, selectedPlatform }: Props) => {
    const dispatch = useDispatch<any>()
    const endpoint = "/platforms"
    const platforms = useSelector(selectPlatforms)
    const error = useSelector(selectErrorState)

    useEffect(() => {
        dispatch(getPlatforms(endpoint))
    }, [endpoint])


    if (Object.keys(error).length) return null
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<BsChevronDown />}>{selectedPlatform?.name || 'Platforms'}</MenuButton>
            <MenuList>
                {platforms.map(platform => <MenuItem key={platform.id} onClick={() => onSelectPlatform(platform)}>{platform.name}</MenuItem>)}
            </MenuList>
        </Menu>
    )
}

export default PlatformSelector
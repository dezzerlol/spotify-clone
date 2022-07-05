import { Box, Divider, Flex, Text } from '@chakra-ui/layout'
import {
  Button,
  ButtonGroup,
  IconButton,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from '@chakra-ui/react'
import _debounce from 'lodash/debounce'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle, IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { logout, searchInDb } from '../../lib/mutations'
import { setSearchValues } from '../../store/Reducer'

type IProps = {
  bgcolor?: string
  type?: 'search' | 'default'
}

// BUG: when erasing and pushing backspace button at 0 letter it searches with last word first letter
// if erasing 1 by 1 letter it works fine

const LayoutHeader = ({ bgcolor, type }: IProps) => {
  const [isClicked, setIsClicked] = useState(false)
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useSelector((state: any) => state.playlistReducer.user)
  const searchDb = (searchValue) => searchInDb(searchValue)

  const debounceSearch = useCallback(
    _debounce(async (searchValue) => {
      const data = await searchDb(searchValue)
      dispatch(setSearchValues(data))
    }, 1500),
    []
  )

  const onLogout = async () => {
    await logout()
    router.push('/signin')
  }

  const HandleSearch = async (e) => {
    if (e.target.value !== '') {
      debounceSearch({ searchValue: e.target.value })
    } else {
      dispatch(setSearchValues([]))
    }
  }

  return (
    <Flex paddingX='10px' justifyContent='space-between' width='100%'>
      <Box width='100%'>
        <ButtonGroup width='70%'>
          <IconButton
            icon={<IoIosArrowDropleftCircle fontSize='35px' />}
            aria-label='back'
            outline='none'
            variant='link'
            color={bgcolor ? bgcolor : 'black'}
            onClick={() => router.back()}
            colorScheme='whiteAlpha'
          />
          <IconButton
            icon={<IoIosArrowDroprightCircle fontSize='35px' />}
            aria-label='next'
            outline='none'
            variant='link'
            color={bgcolor ? bgcolor : 'black'}
            colorScheme='whiteAlpha'
          />
          {type === 'search' ? (
            <Input
              bgColor='white'
              color='black'
              onChange={(e) => HandleSearch(e)}
              placeholder='Artist, track or podcast'
              minWidth='320px'
              width='320px'
              borderRadius='50px'
            />
          ) : (
            ''
          )}
        </ButtonGroup>
      </Box>
      {user && (
        <Box marginRight='3rem' border='0'>
          <Popover autoFocus={false}>
            <PopoverTrigger>
              <Box
                tabIndex={0}
                role='button'
                aria-label='dropdown'
                p='1.5'
                w='140px'
                bg='black'
                borderRadius='50px'
                color='white'
                fontWeight='bold'
                letterSpacing='0.3px'
                border='0'
                onClick={() => setIsClicked((state) => !state)}>
                {user ? (
                  <Box display='flex' alignItems='center'>
                    <Box bgColor='gray.800' padding='4px' borderRadius='50%'>
                      <FaRegUser />
                    </Box>
                    <Text marginLeft='10px' fontSize='16px'>
                      {user.username}
                    </Text>
                    {isClicked ? <IoMdArrowDropup fontSize='22px' /> : <IoMdArrowDropdown fontSize='22px' />}
                  </Box>
                ) : (
                  <Skeleton width='80px' padding='1' borderRadius='50px' />
                )}
              </Box>
            </PopoverTrigger>
            <PopoverContent
              bgColor='#282828'
              color='white'
              boxShadow='0px 0px 5px 3px rgba(0, 0, 0, 0.6)'
              border='0'
              width='220px'>
              <PopoverBody p='1rem'>
                <Box
                  padding='8px 12px'
                  sx={{ '&:hover': { backgroundColor: '#4b4b4b' } }}
                  borderRadius='5px'
                  cursor='pointer'>
                  Account
                </Box>
                <Box
                  padding='8px 12px'
                  sx={{ '&:hover': { backgroundColor: '#4b4b4b' } }}
                  borderRadius='5px'
                  cursor='pointer'>
                  <Link href={user ? `/user/${user.id}` : ''} passHref>
                    Profile
                  </Link>
                </Box>
                <Box
                  padding='8px 12px'
                  sx={{ '&:hover': { backgroundColor: '#4b4b4b' } }}
                  borderRadius='5px'
                  cursor='pointer'>
                  Upgrade to Premium
                </Box>
                <Box
                  padding='8px 12px'
                  sx={{ '&:hover': { backgroundColor: '#4b4b4b' } }}
                  borderRadius='5px'
                  cursor='pointer'>
                  Private session
                </Box>
                <Box
                  padding='8px 12px'
                  sx={{ '&:hover': { backgroundColor: '#4b4b4b' } }}
                  borderRadius='5px'
                  cursor='pointer'>
                  Settings
                </Box>
                <Divider />
                <Box
                  padding='8px 12px'
                  sx={{ '&:hover': { backgroundColor: '#4b4b4b' } }}
                  borderRadius='5px'
                  cursor='pointer'>
                  <Button
                    variant='link'
                    onClick={onLogout}
                    sx={{ '&:hover': { textDecoration: 'none' } }}
                    color='white'
                    fontWeight='400'>
                    Log out
                  </Button>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      )}
    </Flex>
  )
}

export default LayoutHeader

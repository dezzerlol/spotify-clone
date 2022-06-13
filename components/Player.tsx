import { Box, Center, Flex, Text } from '@chakra-ui/layout'
import {
  ButtonGroup,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@chakra-ui/react'
import { useStoreActions } from 'easy-peasy'
import React, { useEffect, useRef, useState } from 'react'
import ReactHowler from 'react-howler'
import {
  MdOutlinePauseCircleFilled,
  MdOutlinePlayCircleFilled,
  MdOutlineRepeat,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
  MdOutlineVolumeUp,
  MdOutlineVolumeOff,
  MdOutlineSpeakerGroup,
  MdOutlineQueueMusic,
} from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { formatTime } from '../lib/formatter'
import { changeActiveSong } from '../store/Reducer'

// FIXME scrubbing sound when moving thumb on seekbar
// FIXME volume not changing when clicking directly on value on volumebar

const Player = ({ songs, activeSong }) => {
  const dispatch = useDispatch()
  const soundRef = useRef(null)
  const [playing, setPlaying] = useState(true)
  const [index, setIndex] = useState(songs.findIndex((s) => s.id === activeSong.id))
  const [seek, setSeek] = useState(0.0)
  const [isSeek, setIsSeek] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [duration, setDuration] = useState(0.0)
  const [volume, setVolume] = useState(true)
  const [volumeLevel, setVolumeLevel] = useState(0.2)
  const repeatRef = useRef(repeat)

  // animating duration on seekbar
  useEffect(() => {
    let timerId
    if (playing && !isSeek) {
      const f = () => {
        setSeek(soundRef.current.seek())
        timerId = requestAnimationFrame(f)
      }
      timerId = requestAnimationFrame(f)

      return () => {
        cancelAnimationFrame(timerId)
      }
    }
    cancelAnimationFrame(timerId)
  }, [playing, isSeek])

  useEffect(() => {
    dispatch(changeActiveSong(songs[index]))
  }, [index, songs])

  // setting repeatref value to current repeat value
  useEffect(() => {
    repeatRef.current = repeat
  }, [repeat])

  // turn on or off music
  const setPlayState = (value: boolean) => {
    setPlaying(value)
  }

  // turn on or off shuffle
  const onShuffle = () => {
    setShuffle((state) => !state)
  }

  // turn on or off repeat
  const onRepeat = () => {
    setRepeat((state) => !state)
  }

  // if current index is more than 0 then subtract 1 song. else loop back to the end of playlist
  const prevSong = () => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1
    })
  }

  /* if shuffle = true shuffle thru songs array. 
  if it shuffles same song again recurse func. 
  if current song is last then return to first song 
  */
  const nextSong = () => {
    setIndex((state: number) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length)
        if (next === state) {
          return nextSong()
        }
        return next
      }
      return state === songs.length - 1 ? 0 : state + 1
    })
  }

  // if repeat = true set seek to 0. else change to next song
  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0)
      soundRef.current.seek(0)
    } else {
      nextSong()
    }
  }

  // on song load set song duration
  const onLoad = () => {
    const songDuration = soundRef.current.duration()
    setDuration(songDuration)
  }

  // on seekbar change set seek to event value
  const onSeek = (e) => {
    setSeek(parseFloat(e[0]))

    if (isSeek === false) {
      soundRef.current.seek(e[0])
    }
  }

  const onTurnOffVolume = () => {
    setVolume(false)
    soundRef.current.volume(0)
  }

  const onTurnOnVolume = () => {
    setVolume(true)
    soundRef.current.volume(volumeLevel)
  }

  const onSeekVolume = (e) => {
    setVolumeLevel(e[0])
    if (e[0] === 0) {
      onTurnOffVolume()
    } else {
      onTurnOnVolume()
    }
  }

  return (
    <Box display='flex' justifyContent='space-between' width='100%'>
      <Box width='70%'>
        <Box>
          <ReactHowler
            playing={playing}
            src={activeSong?.url}
            ref={soundRef}
            onLoad={onLoad}
            onEnd={onEnd}
            volume={volumeLevel}
          />
        </Box>
        <Center color='gray.600'>
          <ButtonGroup>
            <IconButton
              outline='none'
              icon={<MdShuffle />}
              variant='link'
              aria-label='shuffle'
              fontSize='18px'
              color={shuffle ? 'white' : 'gray.600'}
              onClick={onShuffle}
            />
            <IconButton
              outline='none'
              icon={<MdSkipPrevious />}
              variant='link'
              aria-label='previous'
              fontSize='24px'
              onClick={prevSong}
            />
            {playing ? (
              <IconButton
                outline='none'
                icon={<MdOutlinePauseCircleFilled />}
                variant='link'
                aria-label='pause'
                fontSize='40px'
                color='white'
                onClick={() => setPlayState(false)}
              />
            ) : (
              <IconButton
                outline='none'
                icon={<MdOutlinePlayCircleFilled />}
                variant='link'
                aria-label='play'
                fontSize='40px'
                color='white'
                onClick={() => setPlayState(true)}
              />
            )}

            <IconButton
              outline='none'
              icon={<MdSkipNext />}
              variant='link'
              aria-label='next'
              fontSize='24px'
              onClick={nextSong}
            />
            <IconButton
              outline='none'
              icon={<MdOutlineRepeat />}
              variant='link'
              aria-label='repeat'
              fontSize='18px'
              color={repeat ? 'white' : 'gray.600'}
              onClick={onRepeat}
            />
          </ButtonGroup>
        </Center>

        <Box color='gray.600'>
          <Flex justify='center' align='center'>
            <Box width='5%'>
              <Text fontSize='small'>{formatTime(seek)}</Text>
            </Box>

            <Box width='50%'>
              <RangeSlider
                aria-label={['min', 'max']}
                step={0.1}
                min={0}
                max={duration ? (duration.toFixed(2) as unknown as number) : 0}
                onChange={onSeek}
                onChangeStart={() => setIsSeek(true)}
                onChangeEnd={() => setIsSeek(false)}
                value={[seek]}
                focusThumbOnChange={false}
                id='player-range'>
                <RangeSliderTrack bg='gray.800'>
                  <RangeSliderFilledTrack bg='gray.600' />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
              </RangeSlider>
            </Box>

            <Box width='5%' textAlign='right'>
              <Text fontSize='small'>{formatTime(duration)}</Text>
            </Box>
          </Flex>
        </Box>
      </Box>

      <Box display='flex' alignItems='center' width='20%'>
        <ButtonGroup width='50%'>
          <IconButton
            outline='none'
            variant='link'
            fontSize='22px'
            icon={<MdOutlineQueueMusic />}
            aria-label='volume off'
          />
          <IconButton
            outline='none'
            variant='link'
            fontSize='22px'
            icon={<MdOutlineSpeakerGroup />}
            aria-label='volume off'
          />
          {volume ? (
            <IconButton
              outline='none'
              variant='link'
              fontSize='22px'
              icon={<MdOutlineVolumeUp />}
              aria-label='volume off'
              onClick={onTurnOffVolume}
            />
          ) : (
            <IconButton
              outline='none'
              variant='link'
              fontSize='22px'
              icon={<MdOutlineVolumeOff />}
              aria-label='volume off'
              onClick={onTurnOnVolume}
            />
          )}
        </ButtonGroup>
        <Box width='45%'>
          <RangeSlider
            aria-label={['min', 'max']}
            step={0.01}
            min={0}
            max={1}
            onChange={onSeekVolume}
            value={[volumeLevel]}
            focusThumbOnChange={false}
            id='volume-range'>
            <RangeSliderTrack bg='gray.800'>
              <RangeSliderFilledTrack bg='gray.600' />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
          </RangeSlider>
        </Box>
      </Box>
    </Box>
  )
}

export default Player

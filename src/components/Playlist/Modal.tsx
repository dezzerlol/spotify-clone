import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Box,
  Input,
  Textarea,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useSWRConfig } from 'swr'
import { API_GET_PLAYLISTS } from '../../services/apiConsts'
import { changeUsername, renamePlaylist } from '../../services/mutations'

type Props = {
  onClose: () => void
  isOpen: boolean
  image: string
  roundImage: boolean
  subtitle: 'profile' | 'playlist'
  id: number
  pageTitle?: any
  setPageTitle: (arg: string) => void
}

const PlaylistModal = (props: Props) => {
  const { onClose, isOpen, image, roundImage, subtitle, id, pageTitle, setPageTitle } = props
  const { mutate } = useSWRConfig()
  const [inputTitle, setInputTitle] = useState(pageTitle)
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  })

  useEffect(() => {
    setInputTitle(pageTitle)
  }, [pageTitle])

  const handleSave = async () => {
    setPageTitle(inputTitle)
    if (subtitle === 'playlist') {
      await renamePlaylist({ id, newName: inputTitle })
      mutate(API_GET_PLAYLISTS)
    } else if (subtitle === 'profile') {
      await changeUsername({ newUsername: inputTitle })
    }
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size='2xl'>
      <ModalOverlay />
      <ModalContent color='white' bg='gray.900'>
        <ModalHeader>Edit details</ModalHeader>
        <ModalCloseButton />
        <ModalBody display='flex'>
          <Box
            {...getRootProps({ className: 'dropzone' })}
            shadow='5px 5px 20px 19px rgba(0, 0, 0, 0.25)'
            width='180px'
            marginRight='2rem'
            borderRadius={roundImage ? '100%' : ''}>
            <input {...getInputProps()} />
            <Image
              boxSize='180px'
              boxShadow='2xl'
              src={image}
              objectFit='cover'
              borderRadius={roundImage ? '100%' : ''}
            />
          </Box>
          <Box display='flex' alignItems='center' width='70%' flexDirection={subtitle === 'playlist' ? 'column' : null}>
            <Input
              border='0'
              bgColor='gray.800'
              mb='1rem'
              placeholder='Set your playlist name'
              defaultValue={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
            />
            {subtitle === 'playlist' ? (
              <Textarea
                border='0'
                bgColor='gray.800'
                resize='none'
                placeholder='Add an optional description'
                height='120px'
              />
            ) : null}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button color='black' borderRadius='50px' width='90px' padding='25px' onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PlaylistModal

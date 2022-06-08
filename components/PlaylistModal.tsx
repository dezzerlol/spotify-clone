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
import { renamePlaylist } from '../lib/mutations'

const PlaylistModal = ({ onClose, onOpen, isOpen, image, title, roundImage, subtitle, id }) => {
  const [pageTitle, setPageTitle] = useState(title)
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  })

  useEffect(() => {
    setPageTitle(title)
  }, [title])

  const handleSave = async () => {
    await renamePlaylist({ id, newName: pageTitle })
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
          <Box>
            <Box>
              <Input
                border='0'
                bgColor='gray.800'
                mb='1rem'
                placeholder='Set your playlist name'
                defaultValue={title}
                onChange={(e) => setPageTitle(e.target.value)}
              />
              <Textarea
                border='0'
                bgColor='gray.800'
                resize='none'
                placeholder='Add an optional description'
                height='120px'
              />
            </Box>
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

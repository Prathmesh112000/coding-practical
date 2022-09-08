import React, { useState } from 'react'
import styles from "../styles/search.module.css"
import { Input,Button, Flex } from '@chakra-ui/react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Box
  } from '@chakra-ui/react'
function Card({id,category,title,description,price,rating,image,deletedata}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [editdesc, seteditdesc] = useState(description)
    const [openform,setopenform]=useState(false)

    const Editdata=(id)=>{
        console.log("edit");

    }

  return (
    <>
            <div className={styles.content} onClick={onOpen}>
        <div className={styles.imgurl}>
            <img src={image} alt="" />
        </div>

        <div >
            <h1 className={styles.title}>{title}</h1>
        </div>

        <div id="category">
            <h1 className={styles.category}>{category}</h1>
        </div>
        {/* <div className="desc">
            <h1>{description}</h1>
        </div> */}
        <div className="prize">
            <h1>$ {price}</h1>
        </div>
        <div className="rating">
            <h1> Rating {rating.rate}</h1>
        </div>
        <div>
            <h1>Count {rating.count}</h1>
        </div>
        <div className={styles.btnclss}>
            <Button colorScheme='red' onClick={()=>{
                deletedata(id)
            }}>Delete</Button>

{/* <Button onClick={()=>{
                Editdata(id)
            }}>Edit</Button> */}
        </div>

    </div>

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <Flex>
            <div className={styles.modalimg}><img src={image} alt="" srcset="" /></div>
            <div className={styles.modaldesc}>
                <h1 className={styles.modaltitle}>{title}</h1>
                <h1>{category}</h1>
                <h1>{price}</h1>
                <h1>Rating {rating.rate}</h1>
                <h1>Count {rating.count}</h1>
            </div>
            
           </Flex>

           <Box className={styles.modaldetaildesc}>
            {description}
           </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={()=>{
                setopenform(!openform)
            }}>Edit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

     
    
    </>

    
  )
}

export default Card
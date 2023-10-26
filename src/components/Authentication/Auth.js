import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import Signup from './Signup';
import Login from './Login';

export default function Auth(props) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
        <Button className='bg-[#ffd600] font-bold rounded-lg h-12' onPress={onOpen}>Login</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader 
                className="flex flex-col gap-1"
                >
                <Tabs aria-label="Options">
                    <Tab key="1" title="Login">
                    <Card>
                        <CardBody>
                            <Login onClose={onOpenChange} />
                        </CardBody>
                    </Card>  
                    </Tab>
                    <Tab key="2" title="Sign Up">
                    <Card>
                        <CardBody>
                            <Signup onClose={onOpenChange} />
                        </CardBody>
                    </Card>  
                    </Tab>
                </Tabs>
                </ModalHeader>
                </>
            )}
            </ModalContent>
        </Modal>
    </>
  )
}
